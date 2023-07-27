import { DeepPartial } from 'typeorm';
import { format } from 'date-fns';
import { AppDataSource } from '@utils/typeorm';
import { Offer } from '../entity/offers';

export default class OffersModel {
  public async createOffer(offer: DeepPartial<Offer>) {
    try {
      const savedOffer = await AppDataSource.getRepository(Offer).save({
        ...offer,
        createdAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      });
      return savedOffer;
    } catch (err) {
      console.log(err);
      return;
    }
  }
}
