import * as Session from '../data/session-data';

export const create = async ({ sessionData }: Session.Create) => {
  // Enforce some business logic
  const newSociety = await Session.create({ sessionData });
  return newSociety;
};

export const retrieve = async ({ sessionId }: Session.Retrieve) => {
  // Enforce some business logic
  const society = await Session.retrieve({ sessionId });
  return society;
};
