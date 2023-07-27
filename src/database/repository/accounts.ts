import { DeepPartial } from 'typeorm';
import { format } from 'date-fns';
import { AppDataSource } from '@utils/typeorm';
import { Account } from '../entity/accounts';

export default class AccountModel {
  public async createAccount(account: DeepPartial<Account>) {
    try {
      const savedAccount = await AppDataSource.getRepository(Account).save({
        ...account,
        createdAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      });
      return savedAccount;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  public async getAccount(accountId: number) {
    try {
      const account = await AppDataSource.getRepository(Account)
        .createQueryBuilder('account')
        .where({ id: accountId })
        .getOne();
      return account;
    } catch (err) {
      console.log(err);
      return;
    }
  }
}
