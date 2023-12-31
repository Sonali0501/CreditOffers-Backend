import { format } from 'date-fns';
import { CreateOfferSchema, GetActiveOffersSchema, UpdateOfferStatusSchema } from '@/controllers/offers/offerSchema';
import AccountModel from '@/database/repository/accounts';
import OffersModel from '@/database/repository/offers';
import { ServiceResponse } from '@/interfaces/service.interface';
import { Account } from '@/database/entity/accounts';
import { OfferConstants } from '@constants';

const { limitTypes, statuses } = OfferConstants;

class OffersService {
  private offersModel = new OffersModel();
  private accountModel = new AccountModel();

  public async getActiveOffers(filters: GetActiveOffersSchema): Promise<ServiceResponse> {
    const accountId = Number(filters.accountId);
    const activeDate = new Date(filters.activeDate);

    const activeOffers = await this.offersModel.getActiveOffers(accountId, activeDate);

    return {
      ok: true,
      data: activeOffers,
    };
  }

  public async createOffer(offer: CreateOfferSchema): Promise<ServiceResponse> {
    const account = await this.accountModel.getAccount(offer.accountId);
    if (!account)
      return {
        ok: false,
        err: `Account with id: ${offer.accountId} does not exist`,
      };

    const offerValidationResp = this.validateOffer(offer, account);
    if (!offerValidationResp?.ok) return offerValidationResp;

    offer.activationTime = format(new Date(offer.activationTime), 'yyyy-MM-dd HH:mm:ss');
    offer.expiryTime = format(new Date(offer.expiryTime), 'yyyy-MM-dd HH:mm:ss');
    const newOffer = await this.offersModel.createOffer(offer);
    if (!newOffer)
      return {
        ok: false,
        err: 'Failed to create offer',
      };

    return {
      ok: true,
      data: {
        message: 'successfully created offer',
        offer: newOffer,
      },
    };
  }

  public async updateOfferStatus(data: UpdateOfferStatusSchema): Promise<ServiceResponse> {
    const activeOffer = await this.offersModel.getOfferById(data.id);
    if (!activeOffer)
      return {
        ok: false,
        err: `No active offer with id: ${data.id}`,
      };

    if (data.status === statuses.rejected) {
      const rejectResp = await this.offersModel.rejectOffer(data.id);
      if (!rejectResp)
        return {
          ok: false,
          err: 'Failed to reject offer',
        };

      return {
        ok: true,
        data: {
          message: 'Successfully rejected offer',
        },
      };
    }

    if (data.status === statuses.accepted) {
      const acceptResp = await this.offersModel.acceptOffer(data.id, activeOffer);
      if (!acceptResp)
        return {
          ok: false,
          err: 'Failed to accept offer',
        };
      return {
        ok: true,
        data: {
          message: 'Successfully accepted offer',
        },
      };
    }

    return {
      ok: false,
      err: 'unknown status value',
    };
  }

  private validateOffer(offer: CreateOfferSchema, account: Account): ServiceResponse {
    if (offer.limitType == limitTypes.accountLimit && offer.newLimit <= account.accountLimit)
      return {
        ok: false,
        err: 'newLimit should be greater then exisitng accountLimit',
      };

    if (offer.limitType == limitTypes.perTransactionLimit && offer.newLimit <= account.perTransactionLimit)
      return {
        ok: false,
        err: 'newLimit should be greater then exisitng perTransactionLimit',
      };

    if (new Date(offer.expiryTime).getTime() <= new Date(offer.activationTime).getTime())
      return {
        ok: false,
        err: 'expiryTime cannot be before activationTime',
      };

    return {
      ok: true,
    };
  }
}

export default OffersService;
