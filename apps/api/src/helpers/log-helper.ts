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

export const list = async (filePath: string) => {
  try {
    const logData = await fs.promises.readFile(filePath, 'utf8');
    const logEntries: Log[] = logData
      .trim()
      .split('\n')
      .map((entry) => JSON.parse(entry));
    return logEntries;
  } catch (err) {
    throw new Error('Error reading log file');
  }
};
