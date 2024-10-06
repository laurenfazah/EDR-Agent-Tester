import fs from 'fs';
import { BaseActivity, FileActivity, NetworkActivity } from './types';

export const logActivity = (activity: BaseActivity | FileActivity | NetworkActivity) => {
  const logFilePath = './activity_log.json';
  const logEntry = JSON.stringify(activity);

  fs.appendFileSync(logFilePath, logEntry + '\n');
};
