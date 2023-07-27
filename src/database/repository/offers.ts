import { DeepPartial } from 'typeorm';
import { format } from 'date-fns';
import { AppDataSource } from '@utils/typeorm';
import { Offer } from '../entity/offers';
import { Account } from '../entity/accounts';
import { OfferConstants } from '@/constants';

const { statuses, limitTypes } = OfferConstants;

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

  public async getOfferById(id: number) {
    try {
      const activeOffer = await AppDataSource.getRepository(Offer)
        .createQueryBuilder('offers')
        .leftJoinAndSelect('offers.account', 'accounts')
        .where('offers.id = :id', { id })
        .andWhere('offers.status = :status', { status: statuses.pending })
        .getOne();
      return activeOffer;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  public async acceptOffer(id: number, offer) {
    try {
      const currentTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
      const resp = await AppDataSource.transaction(async transManager => {
        const updatedOffer = await transManager
          .getRepository(Offer)
          .createQueryBuilder('offers')
          .update('offers')
          .set({ status: statuses.accepted, updatedAt: currentTime })
          .where({ id })
          .execute();

        const accountUpdationData: DeepPartial<Account> = {
          updatedAt: currentTime,
        };

        if (offer.limitType == limitTypes.accountLimit) {
          accountUpdationData.accountLimit = offer.newLimit;
          accountUpdationData.accountLimitUpdateTime = currentTime;
          accountUpdationData.lastAccountLimit = offer.account.accountLimit;
        } else {
          accountUpdationData.perTransactionLimit = offer.newLimit;
          accountUpdationData.perTransactionLimitUpdateTime = currentTime;
          accountUpdationData.lastPerTransactionLimit = offer.account.perTransactionLimit;
        }
        await transManager
          .getRepository(Account)
          .createQueryBuilder('accounts')
          .update('accounts')
          .set(accountUpdationData)
          .where({ id: offer.accountId })
          .execute();

        return updatedOffer;
      });
      return resp;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  public async rejectOffer(id: number) {
    try {
      const updatedOffer = await AppDataSource.getRepository(Offer)
        .createQueryBuilder('offers')
        .update('offers')
        .set({ status: statuses.rejected, updatedAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss') })
        .where({ id })
        .execute();
      return updatedOffer;
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
