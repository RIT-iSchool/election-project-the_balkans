import * as Ballot from '../data/ballot-data';
import * as ElectionOffice from '../data/election-office-data';
import * as ElectionCandidate from '../data/election-candidate-data';
import * as CandidateVote from '../data/candidate-vote-data';
import { BadRequestError } from '../errors/BadRequestError';

type WriteIn = {
  officeId: number;
  name: string;
};

type Office = {
  candidates: number[];
  writeIn?: WriteIn;
};

type OfficeVotes = {
  [key: string]: Office;
};

type InitiativeVotes = {
  [key: string]: number;
};

type BallotSubmit = {
  officeVotes: OfficeVotes;
  initiativeVotes: InitiativeVotes;
  electionId: number;
};

/**
 * Submits a ballot.
 */
export const submit = async (
  ballot: BallotSubmit,
  memberId: number,
  societyId: number,
) => {
  if (!ballot.officeVotes) {
    throw new BadRequestError('Missing office votes');
  }

  //search for user's existing vote
  const existingVote = await CandidateVote.retrieve({
    electionId: ballot.electionId,
    memberId: memberId,
  });

  //user has already submitted a ballot
  if (existingVote)
    throw new BadRequestError('You have already voted in this election');

  const writeIns = Object.keys(ballot.officeVotes).filter(
    (k) => !!ballot.officeVotes[k]?.writeIn,
  );

  // Handle write-ins
  await Promise.all(
    writeIns.map(async (o) => {
      const candidateName = ballot.officeVotes[o]?.writeIn?.name;
      if (!candidateName) return null;

      const electionCandidateData = await ElectionCandidate.lookup({
        name: candidateName,
        officeId: parseInt(o, 10),
      });

      if (!electionCandidateData) {
        const newElectionCandidate = await ElectionCandidate.create({
          electionCandidateData: {
            name: candidateName,
            description: 'Created automatically by write-in',
            societyId,
            electionOfficeId: parseInt(o, 10),
            writeIn: true,
          },
        });

        ballot.officeVotes[o]?.candidates.push(newElectionCandidate.id);
      }

      if (electionCandidateData) {
        ballot.officeVotes[o]?.candidates.push(electionCandidateData.id);
      }
    }),
  );

  // max votes check
  const electionOffices = await ElectionOffice.list({
    electionId: ballot.electionId,
    societyId,
  });

  const officeMaxVotes = new Map<number, number>();
  electionOffices.forEach((electionOffice) => {
    officeMaxVotes.set(electionOffice.id, electionOffice.maxVotes);
  });

  Object.keys(ballot.officeVotes).forEach((k) => {
    const maxVotes = officeMaxVotes.get(parseInt(k, 10)) || 0;
    const votes = ballot.officeVotes[k]?.candidates.length || 0;

    if (votes > maxVotes) {
      throw new BadRequestError('Invalid number of votes for office');
    }
  });

  const candidateVotes = Object.keys(ballot.officeVotes)
    .map((k) => {
      return ballot.officeVotes[k]!.candidates.map((c) => ({
        memberId,
        electionCandidateId: c,
      }));
    })
    .flat();

  const initiativeVotes = Object.keys(ballot.initiativeVotes)
    .map((k) => {
      return {
        memberId,
        electionInitiativeId: parseInt(k, 10),
        electionInitiativeOptionId: ballot.initiativeVotes[k]!,
      };
    })
    .flat();

  console.log('We made it to the promise land');
  console.log(candidateVotes, initiativeVotes);

  await Ballot.submit({
    ballotSubmitData: {
      initiativeVotesData: initiativeVotes,
      candidateVotesData: candidateVotes,
    },
  });
};

/**
 * Retrieves a ballot.
 */
export const retrieve = async (ballotRetriveParams: Ballot.Retrieve) => {
  const retrieveBallot = await Ballot.retrieve(ballotRetriveParams);
  return retrieveBallot;
};
