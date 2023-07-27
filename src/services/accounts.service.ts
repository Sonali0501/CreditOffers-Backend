import { CreateProductSchema } from '@/controllers/accounts/accountSchema';
import AccountModel from '@/database/repository/accounts';
import { ServiceResponse } from '@/interfaces/service.interface';

class AccountService {
  private accountModel = new AccountModel();

  public async createAccount(account: CreateProductSchema): Promise<ServiceResponse> {
    if (account.accountLimit < account.perTransactionLimit)
      return {
        ok: false,
        err: 'perTransactionLimit cannot be greater than accountLimit',
      };

    const newAccount = await this.accountModel.createAccount(account);
    if (!newAccount)
      return {
        ok: false,
        err: 'Failed to create new account',
      };

    return {
      ok: true,
      data: {
        message: 'successfully created account',
        product: newAccount,
      },
    };
  }
}

export default AccountService;
