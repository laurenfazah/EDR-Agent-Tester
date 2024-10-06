import fs from 'fs';
import { BaseActivity, FileActivity, NetworkActivity } from './types';

export const startProcess = (filePath: string, args: string[]): BaseActivity => {
  let timestamp = Date.now();

  // TODO: execute file at path
  console.log(filePath);

  return {
    timestamp: timestamp,
    username: '',
    processName: '',
    processId: '',
    processCommandLine: args.join()
  };
};

export const createFile = (filePath: string, content: string): FileActivity => {
  let timestamp = Date.now();

  fs.writeFileSync(filePath, content);

  return {
    timestamp: timestamp,
    username: '',
    processName: '',
    processId: '',
    processCommandLine: '',
    path: filePath,
    action: 'create'
  };
};

export const modifyFile = (filePath: string, change: string): FileActivity => {
  // TODO | QUESTION: what is being modified? contents?
  // would use fs.appendFile if we're adding to file
  // would use fs.writeFile if we're overwriting existing file contents (assuming this for now)

  let timestamp = Date.now();

  fs.writeFileSync(filePath, change);

  return {
    timestamp: timestamp,
    username: '',
    processName: '',
    processId: '',
    processCommandLine: '',
    path: filePath,
    action: 'modify'
  };
};

export const deleteFile = (filePath: string): FileActivity => {
  let timestamp = Date.now();

  fs.unlinkSync(filePath);

  return {
    timestamp: timestamp,
    username: '',
    processName: '',
    processId: '',
    processCommandLine: '',
    path: filePath,
    action: 'delete'
  };
};

export const establishNetworkConnection = (dest: string, port: number, data: number): NetworkActivity => {
  let timestamp = Date.now();

  return {
    timestamp: timestamp,
    username: '',
    processName: '',
    processId: '',
    processCommandLine: '',
    destinationAddress: dest,
    destinationPort: port,
    sourceAddress: dest, // TODO
    sourcePort: port, // TODO
    dataSentProtocol: data,
    protocol: ''
  };
};
