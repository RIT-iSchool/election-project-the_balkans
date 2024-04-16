import * as Society from '../data/society-data';

/**
 * Creates a new entry in the society table.
 */
export const create = async (societyCreateParams: Society.Create) => {
  // Enforce some business logic
  const newSociety = await Society.create(societyCreateParams);
  return newSociety;
};

/**
 * Retrieves a society by ID
 */
export const retrieve = async (societyRetrieveParams: Society.Retrieve) => {
  // Enforce some business logic
  const society = await Society.retrieve(societyRetrieveParams);
  return society;
};

/**
 * Lists societies
 */
export const list = async (societyListParams: Society.List) => {
  const societies = await Society.list(societyListParams);
  return societies;
};

/**
 * Report for society
 */
export const report = async (societyReportParams: Society.Report) => {
  const report = await Society.report(societyReportParams);
  return report;
};
