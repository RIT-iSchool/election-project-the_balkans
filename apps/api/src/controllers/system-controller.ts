import * as System from '../data/system-data';

/**
 * Report for system
 */
export const report = async () => {
  const systemReport = await System.report();
  return systemReport;
};
