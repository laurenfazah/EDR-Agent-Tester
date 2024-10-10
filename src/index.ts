import {
  startProcess,
  createFile,
  modifyFile,
  deleteFile,
  establishNetworkConnection
} from './activities';
import { logActivity } from './logger';

const args = process.argv.slice(2);
const filePath = './file-create.txt';

const runSimulation = (args: string[]) => {
  const processStart = startProcess('./scripts/http_request.sh', args);
  logActivity(processStart);

  const fileCreation = createFile(filePath, 'Hello world!');
  logActivity(fileCreation);

  const fileModification = modifyFile(filePath, 'This is a change.');
  logActivity(fileModification);

  const fileDeletion = deleteFile(filePath);
  logActivity(fileDeletion);

  const networkActivity = establishNetworkConnection('example.com', 80);
  logActivity(networkActivity);
};

runSimulation(args);
