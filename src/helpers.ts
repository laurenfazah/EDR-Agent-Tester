import os from 'os';

export const getLocalIPAddress = (): string | null => {
  const interfaces = os.networkInterfaces();

  for (const interfaceName in interfaces) {
    const networkInterface = interfaces[interfaceName];

    if (networkInterface) {
      for (const iface of networkInterface) {
        if (iface.family === 'IPv4' && !iface.internal)
          return iface.address;
      }
    }
  }

  return null;
};
