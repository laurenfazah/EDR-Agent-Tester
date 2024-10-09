import { startProcess, createFile, modifyFile, deleteFile, establishNetworkConnection } from './activities';
import { logActivity } from './logger';

const args = process.argv.slice(2);

const runSimulation = (args: string[]) => {
  const processStart = startProcess('./scripts/http_request.sh', args);
  logActivity(processStart);

  const fileCreation = createFile('./file-create.md', 'Hello world!');
  logActivity(fileCreation);

  const fileModification = modifyFile('./file-modify.md', 'HELLO WORLD');
  logActivity(fileModification);

  const fileDeletion = deleteFile('./file-create.md');
  logActivity(fileDeletion);

  const networkActivity = establishNetworkConnection('example.com', 80);
  logActivity(networkActivity);
};

runSimulation(args);
