import fs from 'fs';
import net from 'net';
import os from 'os';
import { exec, spawn } from 'child_process';
import { BaseActivity, FileActivity, NetworkActivity } from './types';

export const startProcess = (path: string, args: string[]): BaseActivity => {
  const username = os.userInfo().username;
  const execCommand = `${path} ${args.join(' ')}`;
  const processId = spawn(path, args).pid;
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
    processId: processId,
    processCommandLine: execCommand
  };
};

export const createFile = (path: string, content: string): FileActivity => {
  const username = os.userInfo().username;
  let timestamp = Date.now();

  fs.writeFileSync(path, content);

  return {
    timestamp: timestamp,
    username: username,
    processName: 'node',
    processId: process.pid,
    processCommandLine: `touch ${path}`,
    path: path,
    action: 'create'
  };
};

export const modifyFile = (path: string, change: string): FileActivity => {
  const username = os.userInfo().username;
  // TODO | QUESTION: what is being modified? contents?
  // would use fs.appendFile if we're adding to file
  // would use fs.writeFile if we're overwriting existing file contents (assuming this for now)

  let timestamp = Date.now();

  fs.writeFileSync(path, change);

  return {
    timestamp: timestamp,
    username: username,
    processName: 'node',
    processId: process.pid,
    processCommandLine: `vim ${path}`,
    path: path,
    action: 'modify'
  };
};

export const deleteFile = (path: string): FileActivity => {
  const username = os.userInfo().username;
  let timestamp = Date.now();

  fs.unlinkSync(path);

  return {
    timestamp: timestamp,
    username: username,
    processName: 'node',
    processId: process.pid,
    processCommandLine: `rm ${path}`,
    path: path,
    action: 'delete'
  };
};

export const establishNetworkConnection = (dest: string, port: number): NetworkActivity => {
  const protocol = 'tcp';
  const sourceAddress = '127.0.0.1';
  const username = os.userInfo().username;
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
    processName: 'curl',
    processId: process.pid, // current node.js process
    processCommandLine: `curl http://${dest}:${port}`,
    destinationAddress: dest,
    destinationPort: port,
    sourceAddress: sourceAddress,
    sourcePort: sourcePort,
    dataAmountSent: totalDataSent,
    protocol: protocol
  };
};
