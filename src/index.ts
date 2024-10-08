import { startProcess, createFile, modifyFile, deleteFile, establishNetworkConnection } from './activities';
import { logActivity } from './logger';

const args = process.argv.slice(2);
const username = args.shift() ?? 'unknown';

const runSimulation = (username: string, args: string[]) => {
  const processStart = startProcess('./scripts/http_request.sh', args, username);
  logActivity(processStart);

  const fileCreation = createFile('./file-create.md', 'Hello world!', username);
  logActivity(fileCreation);

  const fileModification = modifyFile('./file-modify.md', 'HELLO WORLD', username);
  logActivity(fileModification);

  const fileDeletion = deleteFile('./file-create.md', username);
  logActivity(fileDeletion);

  const networkActivity = establishNetworkConnection('example.com', 80, username);
  logActivity(networkActivity);
};

runSimulation(username, args);
