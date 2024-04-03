import * as Ballot from '../data/ballot-data';

/**
 * Submits a ballot.
 */
export const submit = async (ballotSubmitParams: Ballot.Submit) => {
  await Ballot.submit(ballotSubmitParams);
};

/**
 * Retrieves a ballot.
 */
export const retrieve = async (ballotRetriveParams: Ballot.Retrieve) => {
  const retrieveBallot = await Ballot.retrieve(ballotRetriveParams);
  return retrieveBallot;
};
