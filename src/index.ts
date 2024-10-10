import {
  startProcess,
  createFile,
  modifyFile,
  deleteFile,
  establishNetworkConnection
} from './activities';

import { logActivity } from './logger';

const filePath = './file-create.txt';

const runSimulation = () => {
  const curlProcess = startProcess('/usr/bin/curl', ['https://example.com', '-v']);
  logActivity(curlProcess);

  const bashProcess = startProcess('./scripts/http_request.sh', ['https://example.com']);
  logActivity(bashProcess);

  const fileCreation = createFile(filePath, 'Hello world!');
  logActivity(fileCreation);

  const fileModification = modifyFile(filePath, 'This is a change.');
  logActivity(fileModification);

  const fileDeletion = deleteFile(filePath);
  logActivity(fileDeletion);

  const networkActivity = establishNetworkConnection('example.com', 80);
  logActivity(networkActivity);
};

runSimulation();
