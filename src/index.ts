import { startProcess, createFile, modifyFile, deleteFile, establishNetworkConnection } from './activities';
import { logActivity } from './logger';

const runSimulation = () => {
  const processStart = startProcess('./executable.js', ['arg1', 'arg2']);
  logActivity(processStart);

  const fileCreation = createFile('./file-create.md', 'Hello world!');
  logActivity(fileCreation);

  const fileModification = modifyFile('./file-modify.md', 'HELLO WORLD');
  logActivity(fileModification);

  const fileDeletion = deleteFile('./file-create.md');
  logActivity(fileDeletion);

  const networkActivity = establishNetworkConnection('192.123.1.1', 80, 1234);
  logActivity(networkActivity);
};

runSimulation();
