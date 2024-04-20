import fs from 'fs';

type Log = {
  name: string;
  hostname: string;
  pid: number;
  level: number;
  response: {
    status_code: number;
    timestamp: string;
    timestamp_ms: number;
    elapsed: number;
    headers: string;
    body: string;
  };
  request: {
    method: string;
    url_params: any;
    url: string;
    url_route: string;
    query: any;
    headers: string;
    timestamp: string;
    timestamp_ms: number;
    body: string;
  };
  'millis-timestamp': number;
  'utc-timestamp': string;
  stage: string;
  msg: string;
  time: string;
  v: number;
};

const list = async () => {
  try {
    const logData = await fs.promises.readFile(
      '/Users/coopergadd/Documents/RIT/Spring24/ISTE432/election-project-the_balkans/var/logs/american-dream.log',
      'utf8',
    );
    const logEntries: Log[] = logData
      .trim()
      .split('\n')
      .map((entry) => JSON.parse(entry));
    return logEntries;
  } catch (err) {
    throw new Error('Error reading log file');
  }
};

export const calculate = async () => {
  try {
    const logEntries = await list();
    let totalRequestTime = 0;
    let totalResponseTime = 0;

    logEntries.forEach((log) => {
      totalRequestTime += log.request.timestamp_ms;
      totalResponseTime += log.response.timestamp_ms;
    });

    const averageRequestTime = totalRequestTime / logEntries.length;
    const averageResponseTime = totalResponseTime / logEntries.length;

    return {
      averageRequestTime,
      averageResponseTime,
    };
  } catch (err) {
    throw new Error('Error calculating averages');
  }
};
