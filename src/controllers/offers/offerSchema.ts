import { z } from 'zod';
import { OfferConstants } from '@/constants';

const { limitTypes } = OfferConstants;

export const CreateOfferSchemaZ = z.object({
  accountId: z.number(),
  limitType: z.enum([limitTypes.accountLimit, limitTypes.perTransactionLimit]),
  newLimit: z.number(),
  activationTime: z.string(),
  expiryTime: z.string(),
});

export type CreateOfferSchema = z.infer<typeof CreateOfferSchemaZ>;
