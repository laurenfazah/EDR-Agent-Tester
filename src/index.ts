import { startProcess, createFile, modifyFile, deleteFile, establishNetworkConnection } from './activities';
import { logActivity } from './logger';

const runSimulation = () => {
  const processStart = startProcess('/path/to/executable', ['arg1', 'arg2']);
  logActivity(processStart);

  const fileCreation = createFile('/path/to/file', 'Hello world!');
  logActivity(fileCreation);

  const fileModification = modifyFile('/path/to/file', 'HELLO WORLD');
  logActivity(fileModification);

  const fileDeletion = deleteFile('/path/to/file');
  logActivity(fileDeletion);

  const networkActivity = establishNetworkConnection('192.123.1.1', 80, 1234);
  logActivity(networkActivity);
};

runSimulation();
