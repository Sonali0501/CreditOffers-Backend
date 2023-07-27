import { z } from 'zod';
import { OfferConstants } from '@/constants';

const { limitTypes, statuses } = OfferConstants;

export const CreateOfferSchemaZ = z.object({
  accountId: z.number(),
  limitType: z.enum([limitTypes.accountLimit, limitTypes.perTransactionLimit]),
  newLimit: z.number(),
  activationTime: z.string(),
  expiryTime: z.string(),
});

export const GetActiveOffersSchemaZ = z.object({
  accountId: z.string(),
  activeDate: z.string(),
});

export const UpdateOfferStatusSchemaZ = z.object({
  id: z.number(),
  status: z.enum([statuses.accepted, statuses.rejected]),
});

export type CreateOfferSchema = z.infer<typeof CreateOfferSchemaZ>;
export type GetActiveOffersSchema = z.infer<typeof GetActiveOffersSchemaZ>;
export type UpdateOfferStatusSchema = z.infer<typeof UpdateOfferStatusSchemaZ>;
