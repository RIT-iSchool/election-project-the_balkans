import * as Society from '../data/society-data';

export const create = async ({ societyData }: Society.Create) => {
  // Enforce some business logic
  const newSociety = await Society.create({ societyData });
  return newSociety;
};

export const retrieve = async ({ societyId }: Society.Retrieve) => {
  // Enforce some business logic
  const society = await Society.retrieve({ societyId });
  return society;
};
