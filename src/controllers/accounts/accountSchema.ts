import { z } from 'zod';

export const CreateAccountSchemaZ = z.object({
  customerId: z.number(),
  accountLimit: z.number(),
  perTransactionLimit: z.number(),
});

export const GetAccountSchemaZ = z.object({
  id: z.string(),
});

export type CreateAccountSchema = z.infer<typeof CreateAccountSchemaZ>;
export type GetAccountSchema = z.infer<typeof GetAccountSchemaZ>;
