import * as Ballot from '../data/ballot-data';
import * as ElectionOffice from '../data/election-office-data';
import * as ElectionCandidate from '../data/election-candidate-data';

/**
 * Submits a ballot.
 */
export const submit = async (ballotSubmitParams: Ballot.Submit) => {
  //candidate vote is required
  if (ballotSubmitParams.candidateVotesData.length === 0) throw Error;

  //write in logic
  if (ballotSubmitParams.writeIn) {
    const memberId = ballotSubmitParams.candidateVotesData.pop()?.memberId;

    const electionCandidateData = await ElectionCandidate.retrieve({
      name: ballotSubmitParams.writeIn.name,
    });

    //candidate exists
    if (electionCandidateData) {
      ballotSubmitParams.candidateVotesData.push({
        memberId: memberId!,
        electionCandidateId: electionCandidateData.id,
      });
      //candidate doesn't exist
    } else {
      const newElectionCandidate = await ElectionCandidate.create({
        electionCandidateData: ballotSubmitParams.writeIn,
      });
      ballotSubmitParams.candidateVotesData.push({
        memberId: memberId!,
        electionCandidateId: newElectionCandidate.id,
      });
    }
  }

  //max votes check
  const electionId = ballotSubmitParams.electionId;
  const societyId = ballotSubmitParams.societyId;
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
  ballotSubmitParams.candidateVotesData.forEach((candidateVote) => {
    const candidate = electionCandidates.find(
      (candidate) =>
        candidate.electionCandidate.id === candidateVote.electionCandidateId,
    );
    if (candidate) {
      const officeId = candidate.electionCandidate.electionOfficeId;
      const currentVotes = officeActualVotes.get(officeId) || 0;
      officeActualVotes.set(officeId, currentVotes + 1);
    }
  });

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
