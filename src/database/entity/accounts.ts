import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from './customers';
import { Offer } from './offers';

@Entity('accounts')
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'account_limit' })
  accountLimit: number;

  @Column({ name: 'per_transaction_limit' })
  perTransactionLimit: number;

  @Column({ name: 'last_account_limit', nullable: true })
  lastAccountLimit?: number;

  @Column({ name: 'last_per_transaction_limit', nullable: true })
  lastPerTransactionLimit?: number;

  @Column({ name: 'account_limit_update_time', nullable: true })
  accountLimitUpdateTime?: Date;

  @Column({ name: 'per_transaction_limit_update_time', nullable: true })
  perTransactionLimitUpdateTime?: Date;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at', nullable: true })
  updatedAt?: Date;

  @Column({ name: 'customer_id' })
  customerId: number;

  @ManyToOne(() => Customer, customer => customer.accounts, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToMany(() => Offer, offer => offer.account)
  offers: Offer[];
}
