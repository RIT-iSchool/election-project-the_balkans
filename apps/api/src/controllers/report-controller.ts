import * as Report from '../data/report-data';

/**
 * Report for society
 */
export const society = async (societyParams: Report.Society) => {
  const report = await Report.society(societyParams);
  return report;
};

/**
 * Report for system
 */
export const system = async () => {
  const report = await Report.system();
  return report;
};
