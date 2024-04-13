import * as Ballot from '../data/ballot-data';

//TODO: max votes check
/**
 * Submits a ballot.
 */
export const submit = async (ballotSubmitParams: Ballot.Submit) => {
  if (ballotSubmitParams.candidateVotesData.length === 0) throw Error; // candidate vote required
  await Ballot.submit(ballotSubmitParams);
};

/**
 * Retrieves a ballot.
 */
export const retrieve = async (ballotRetriveParams: Ballot.Retrieve) => {
  const retrieveBallot = await Ballot.retrieve(ballotRetriveParams);
  return retrieveBallot;
};
