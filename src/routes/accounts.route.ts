import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import { asyncResponseWrapper } from '@/helpers';
import { validateRequestBody, validateRequestQueries } from '@middlewares/validation.middleware';
import AccountController from '@/controllers/accounts/accounts.controller';
import { CreateAccountSchemaZ, GetAccountSchemaZ } from '@/controllers/accounts/accountSchema';

class AccountRoutes implements Routes {
  public path = '/api/v1/account';
  public router = Router();
  public accountController = new AccountController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route(`${this.path}/`)
      .get(
        authMiddleware,
        validateRequestQueries(GetAccountSchemaZ),
        asyncResponseWrapper(this.accountController.getAccount),
      )
      .post(
        authMiddleware,
        validateRequestBody(CreateAccountSchemaZ),
        asyncResponseWrapper(this.accountController.createAccount),
      );
  }
}

export default AccountRoutes;
