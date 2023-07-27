const LimitTypes = {
  accountLimit: 'ACCOUNT_LIMIT',
  perTransactionLimit: 'PER_TRANSACTION_LIMIT',
} as const;

export enum LimitTypesEnum {
  accountLimit = 'ACCOUNT_LIMIT',
  perTransactionLimit = 'PER_TRANSACTION_LIMIT',
}

const Statuses = {
  accepted: 'ACCEPTED',
  rejected: 'REJECTED',
  pending: 'PENDING',
};

export enum StatusEnum {
  accepted = 'ACCEPTED',
  rejected = 'REJECTED',
  pending = 'PENDING',
}

export const OfferConstants = {
  limitTypes: LimitTypes,
  limitTypesEnum: LimitTypesEnum,
  statusEnum: StatusEnum,
  statuses: Statuses,
} as const;
