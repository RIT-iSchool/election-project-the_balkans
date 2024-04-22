import * as Report from '../data/report-data';

/**
 * Report for society
 */
export const societyReport = async (societyParams: Report.Society) => {
  const report = await Report.societyReport(societyParams);
  return report;
};

/**
 * Report for system
 */
export const systemReport = async () => {
  const report = await Report.systemReport();
  return report;
};

/**
 * Report for status of an election
 */
export const statusReport = async (statusParams: Report.Status) => {
  const report = await Report.statusReport(statusParams);
  return report;
};

/**
 * Report for results of an election
 */
export const resultsReport = async (resultsParams: Report.Results) => {
  const report = await Report.resultsReport(resultsParams);
  return report;
};
