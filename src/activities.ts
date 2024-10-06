import { BaseActivity, FileActivity, NetworkActivity } from './types';

export const startProcess = (filePath: string, args: string[]): BaseActivity => {
  // TODO: Start a process
};

export const createFile = (filePath: string, content: string): FileActivity => {
  // TODO: Create a file
};

export const modifyFile = (filePath: string, change: string): FileActivity => {
  // TODO: Modify a file
};

export const deleteFile = (filePath: string): FileActivity => {
  // TODO: Delete a file
};

export const establishNetworkConnection = (dest: string, port: number, data: number): NetworkActivity => {
  // TODO: Establish a network connection and transmit data
};
