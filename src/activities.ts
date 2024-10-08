import fs from 'fs';
import net from 'net';
import { exec } from 'child_process';
import { BaseActivity, FileActivity, NetworkActivity } from './types';

export const startProcess = (path: string, args: string[], username: string): BaseActivity => {
  const execCommand = `${path} ${args.join(' ')}`;
  const timestamp = Date.now();

  exec(execCommand, (error, stdout, _stderr) => {
    if (error) {
      console.log(`Error executing process: ${error}`);
    } else {
      console.log(`Process output: ${stdout}`);
    }
  });

  return {
    timestamp: timestamp,
    username: username,
    processName: path,
    processId: Math.floor(Math.random() * 10000),
    processCommandLine: execCommand
  };
};

export const createFile = (filePath: string, content: string, username: string): FileActivity => {
  let timestamp = Date.now();

  fs.writeFileSync(filePath, content);

  return {
    timestamp: timestamp,
    username: username,
    processName: '',
    processId: Math.floor(Math.random() * 10000),
    processCommandLine: '',
    path: filePath,
    action: 'create'
  };
};

export const modifyFile = (filePath: string, change: string, username: string): FileActivity => {
  // TODO | QUESTION: what is being modified? contents?
  // would use fs.appendFile if we're adding to file
  // would use fs.writeFile if we're overwriting existing file contents (assuming this for now)

  let timestamp = Date.now();

  fs.writeFileSync(filePath, change);

  return {
    timestamp: timestamp,
    username: username,
    processName: '',
    processId: Math.floor(Math.random() * 10000),
    processCommandLine: '',
    path: filePath,
    action: 'modify'
  };
};

export const deleteFile = (filePath: string, username: string): FileActivity => {
  let timestamp = Date.now();

  fs.unlinkSync(filePath);

  return {
    timestamp: timestamp,
    username: username,
    processName: '',
    processId: Math.floor(Math.random() * 10000),
    processCommandLine: '',
    path: filePath,
    action: 'delete'
  };
};

export const establishNetworkConnection = (dest: string, port: number, username: string): NetworkActivity => {
  const protocol = 'tcp';
  const sourceAddress = '127.0.0.1';
  const sourcePort = Math.floor(Math.random() * 10000);
  const client = new net.Socket();

  let totalDataSent = 0;
  let timestamp = Date.now();

  client.connect(port, dest, () => {
    console.log(`Connecting from ${sourceAddress}:${sourcePort} to ${dest}:${port}`);

    const data = Buffer.from('This is a stand-in for transmitted data.');
    totalDataSent = data.length;
    client.write(data);
  });

  client.on('close', () => {
    console.log('Connection closed.');
  });

  client.on('error', (error) => {
    console.log(`Connection error: ${error.message}`);
  });

  return {
    timestamp: timestamp,
    username: username,
    processName: '',
    processId: Math.floor(Math.random() * 10000),
    processCommandLine: '',
    destinationAddress: dest,
    destinationPort: port,
    sourceAddress: sourceAddress,
    sourcePort: sourcePort,
    dataAmountSent: totalDataSent,
    protocol: protocol
  };
};
