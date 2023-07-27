import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { Account } from './accounts';

export enum limitTypes {
  accountLimit = 'ACCOUNT_LIMIT',
  perTransactionLimit = 'PER_TRANSACTION_LIMIT',
}

export enum Statuses {
  accepted = 'ACCEPTED',
  rejected = 'REJECTED',
  pending = 'PENDING',
}

@Entity('offers')
export class Offer extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'enum', enum: limitTypes, name: 'limit_type' })
  limitType: limitTypes;

  @Column({ name: 'new_limit' })
  newLimit: number;

  @Column({ name: 'activation_time' })
  activationTime: Date;

  @Column({ name: 'expiry_time' })
  expiryTime: Date;

  @Column({ type: 'enum', enum: Statuses, default: 'PENDING' })
  status: Statuses;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at', nullable: true })
  updatedAt?: Date;

  @Column({ name: 'account_id' })
  accountId: number;

  @ManyToOne(() => Account, account => account.offers, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'account_id' })
  account: Account;
}
