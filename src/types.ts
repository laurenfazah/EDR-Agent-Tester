export type ActivityType = 'process' | 'file' | 'network';

export interface BaseActivity {
  timestamp: number;
  username: string;
  processName: string;
  processId: number;
  processCommandLine: string;
}

export interface FileActivity extends BaseActivity {
  path: string;
  action: 'create' | 'modify' | 'delete';
}

export interface NetworkActivity extends BaseActivity {
  destinationAddress: string;
  destinationPort: number;
  sourceAddress: string;
  sourcePort: number;
  dataSentProtocol: number;
  protocol: string;
}
