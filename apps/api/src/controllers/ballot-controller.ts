import * as Ballot from '../data/ballot-data';
import * as ElectionOffice from '../data/election-office-data';
import * as ElectionCandidate from '../data/election-candidate-data';

/**
 * Submits a ballot.
 */
export const submit = async (ballotSubmitParams: Ballot.Submit) => {
  if (ballotSubmitParams.candidateVotesData.length === 0) throw Error;

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
