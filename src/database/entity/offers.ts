import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { Account } from './accounts';
import { OfferConstants } from '@/constants';

const { limitTypesEnum, statusEnum, statuses } = OfferConstants;

@Entity('offers')
export class Offer extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'enum', enum: limitTypesEnum, name: 'limit_type' })
  limitType: string;

  @Column({ name: 'new_limit' })
  newLimit: number;

  @Column({ name: 'activation_time' })
  activationTime: Date;

  @Column({ name: 'expiry_time' })
  expiryTime: Date;

  @Column({ type: 'enum', enum: statusEnum, default: statuses.pending })
  status: string;

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
