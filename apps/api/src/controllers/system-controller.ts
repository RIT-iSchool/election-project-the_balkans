import * as System from '../data/system-data';

/**
 * Report for system
 */
export const report = async () => {
  const report = await System.report();
  return report;
};
