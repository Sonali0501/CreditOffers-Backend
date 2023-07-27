import { z } from 'zod';

export const CreateProductSchemaZ = z.object({
  customerId: z.number(),
  accountLimit: z.number(),
  perTransactionLimit: z.number(),
});

export type CreateProductSchema = z.infer<typeof CreateProductSchemaZ>;
