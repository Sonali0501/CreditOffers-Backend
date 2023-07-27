import { DataSource } from 'typeorm';
import { config } from '@utils/config.utils';
import { Customer } from '@/database/entity/customers';
import { Account } from '@/database/entity/accounts';
import { Offer } from '@/database/entity/offers';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.dbConfig.host,
  port: Number(config.dbConfig.port),
  username: config.dbConfig.user,
  password: config.dbConfig.pass,
  database: config.dbConfig.name,
  entities: [Customer, Account, Offer],
  synchronize: config.typeorm.synchronize,
  logging: config.typeorm.logging,
});
