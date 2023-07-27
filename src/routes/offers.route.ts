import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import { asyncResponseWrapper } from '@/helpers';
import { validateRequestBody, validateRequestQueries } from '@middlewares/validation.middleware';
import OffersController from '@/controllers/offers/offers.controller';
import { CreateOfferSchemaZ } from '@/controllers/offers/offerSchema';

class OffersRoutes implements Routes {
  public path = '/api/v1/offer';
  public router = Router();
  public offersController = new OffersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route(`${this.path}/`)
      .post(
        authMiddleware,
        validateRequestBody(CreateOfferSchemaZ),
        asyncResponseWrapper(this.offersController.createOffer),
      );
  }
}

export default OffersRoutes;