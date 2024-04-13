import * as Ballot from '../data/ballot-data';

//TODO: max votes check
//TODO: no options allowed
//TODO: candidate vote required
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
