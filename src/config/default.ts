import { IConfigApp } from './constraint';

const config: IConfigApp = {
  port: 4000,
  origin: '*',
  credentials: true,
  typeorm: {
    type: 'postgres',
    synchronize: true,
    logging: ['error'],
  },
};

export default config;
