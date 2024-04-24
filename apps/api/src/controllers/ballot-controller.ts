import * as Ballot from '../data/ballot-data';
import * as ElectionOffice from '../data/election-office-data';
import * as ElectionCandidate from '../data/election-candidate-data';

/**
 * Submits a ballot.
 */
export const submit = async (ballotSubmitParams: Ballot.Submit) => {
  //candidate vote is required
  if (!ballotSubmitParams.ballotSubmitData.candidateVotesData) throw Error;

  //write in logic
  if (ballotSubmitParams.ballotSubmitData.writeIn) {
    const memberId =
      ballotSubmitParams.ballotSubmitData.candidateVotesData.pop()?.memberId;

    const electionCandidateData = await ElectionCandidate.lookup({
      name: ballotSubmitParams.ballotSubmitData.writeIn.name,
    });

    //candidate exists
    if (electionCandidateData) {
      ballotSubmitParams.ballotSubmitData.candidateVotesData.push({
        memberId: memberId!,
        electionCandidateId: electionCandidateData.id,
      });
      //candidate doesn't exist
    } else {
      const newElectionCandidate = await ElectionCandidate.create({
        electionCandidateData: ballotSubmitParams.ballotSubmitData.writeIn,
      });
      ballotSubmitParams.ballotSubmitData.candidateVotesData.push({
        memberId: memberId!,
        electionCandidateId: newElectionCandidate.id,
      });
    }
  }

  //max votes check
  const electionId = ballotSubmitParams.ballotSubmitData.electionId;
  const societyId = ballotSubmitParams.ballotSubmitData.societyId;
  const electionOffices = await ElectionOffice.list({ electionId, societyId });
  const electionCandidates = await ElectionCandidate.list({
    electionId,
    societyId,
  });

  const officeMaxVotes = new Map<number, number>();
  electionOffices.forEach((electionOffice) => {
    officeMaxVotes.set(electionOffice.id, electionOffice.maxVotes);
  });

  const officeActualVotes = new Map<number, number>();
  ballotSubmitParams.ballotSubmitData.candidateVotesData.forEach(
    (candidateVote) => {
      const candidate = electionCandidates.find(
        (candidate) => candidate.id === candidateVote.electionCandidateId,
      );
      if (candidate) {
        const officeId = candidate.electionOfficeId;
        const currentVotes = officeActualVotes.get(officeId) || 0;
        officeActualVotes.set(officeId, currentVotes + 1);
      }
    },
  );

  officeActualVotes.forEach((officeId, currentVotes) => {
    const maxVotes = officeMaxVotes.get(officeId) || 0;
    if (currentVotes > maxVotes) throw Error;
  });

  await Ballot.submit(ballotSubmitParams);
};

/**
 * Retrieves a ballot.
 */
export const retrieve = async (ballotRetriveParams: Ballot.Retrieve) => {
  const retrieveBallot = await Ballot.retrieve(ballotRetriveParams);
  return retrieveBallot;
};
