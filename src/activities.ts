import fs from 'fs';
import net from 'net';
import os from 'os';
import { exec, spawn } from 'child_process';
import { BaseActivity, FileActivity, NetworkActivity } from './types';
import { getLocalIPAddress } from './helpers';

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
    timestamp,
    username,
    processName: path,
    processId: processId,
    processCommandLine: execCommand
  };
};

export const createFile = (path: string, content: string): FileActivity => {
  const username = os.userInfo().username;
  const timestamp = Date.now();

  fs.writeFileSync(path, content);

  return {
    timestamp,
    username,
    processName: 'node',
    processId: process.pid,
    processCommandLine: `node -e "require('fs').writeFileSync(${path}, ${content})`,
    path,
    action: 'create'
  };
};

export const modifyFile = (path: string, change: string): FileActivity => {
  const username = os.userInfo().username;
  const timestamp = Date.now();

  fs.appendFileSync(path, `\n${change}`);

  return {
    timestamp,
    username,
    processName: 'node',
    processId: process.pid,
    processCommandLine: `node -e "require('fs').appendFileSync(${path}, \n${change})`,
    path,
    action: 'modify'
  };
};

export const deleteFile = (path: string): FileActivity => {
  const username = os.userInfo().username;
  const timestamp = Date.now();

  fs.unlinkSync(path);

  return {
    timestamp,
    username,
    processName: 'node',
    processId: process.pid,
    processCommandLine: `node -e "require('fs').unlinkSync(${path})`,
    path,
    action: 'delete'
  };
};

export const establishNetworkConnection = (dest: string, port: number): NetworkActivity => {
  const protocol = 'tcp';
  const sourceAddress = getLocalIPAddress() || '127.0.0.1';
  const username = os.userInfo().username;
  const sourcePort = Math.floor(Math.random() * 10000);
  const client = new net.Socket();
  const timestamp = Date.now();

  let totalDataSent = 0;

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
    timestamp,
    username,
    processName: 'node',
    processId: process.pid, // current node.js process
    processCommandLine: `node -e "require('net').Socket().connect(${port}, '${dest}')"`,
    destinationAddress: dest,
    destinationPort: port,
    sourceAddress,
    sourcePort,
    dataAmountSent: totalDataSent,
    protocol,
  };
};
