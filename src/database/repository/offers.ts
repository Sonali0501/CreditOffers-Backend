import { DeepPartial } from 'typeorm';
import { format } from 'date-fns';
import { AppDataSource } from '@utils/typeorm';
import { Offer } from '../entity/offers';
import { OfferConstants } from '@/constants';

const { statuses } = OfferConstants;

export default class OffersModel {
  public async getActiveOffers(accountId: number, activeDate: Date) {
    try {
      const activeOffers = await AppDataSource.getRepository(Offer)
        .createQueryBuilder('offer')
        .where({ accountId })
        .andWhere({ status: statuses.pending })
        .andWhere('offer.activation_time <= :activeDate', { activeDate })
        .andWhere('offer.expiry_time > :activeDate', { activeDate })
        .getMany();
      return activeOffers;
    } catch (err) {
      console.log(err);
      return;
    }
  }

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
