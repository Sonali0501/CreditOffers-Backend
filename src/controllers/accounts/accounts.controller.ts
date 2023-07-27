import { Request } from 'express';
import { CustomResponse } from '@/interfaces/response.interface';
import { ServiceResponse } from '@/interfaces/service.interface';
import AccountService from '@/services/accounts.service';

class AccountController {
  private accountService = new AccountService();

  public getAccount = async (req: Request, res: CustomResponse): Promise<CustomResponse> => {
    const accountId = Number(req.query.id);
    const resp: ServiceResponse = await this.accountService.getAccount(accountId);
    if (!resp?.ok) return res.invalid({ code: 400, msg: resp.err });
    return res.success({ data: resp.data });
  };

  public createAccount = async (req: Request, res: CustomResponse): Promise<CustomResponse> => {
    const resp: ServiceResponse = await this.accountService.createAccount(req.body);
    if (!resp?.ok) return res.invalid({ code: 400, msg: resp.err });
    return res.success({ data: resp.data });
  };
}

export default AccountController;
