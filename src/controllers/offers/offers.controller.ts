import { Request } from 'express';
import { CustomResponse } from '@/interfaces/response.interface';
import { ServiceResponse } from '@/interfaces/service.interface';
import OffersService from '@/services/offers.service';

class OffersController {
  private offersService = new OffersService();

  public getActiveOffers = async (req: Request, res: CustomResponse): Promise<CustomResponse> => {
    const resp: ServiceResponse = await this.offersService.getActiveOffers(req.query);
    if (!resp?.ok) return res.invalid({ code: 400, msg: resp.err });
    return res.success({ data: resp.data });
  };

  public createOffer = async (req: Request, res: CustomResponse): Promise<CustomResponse> => {
    const resp: ServiceResponse = await this.offersService.createOffer(req.body);
    if (!resp?.ok) return res.invalid({ code: 400, msg: resp.err });
    return res.success({ data: resp.data });
  };
}

export default OffersController;
