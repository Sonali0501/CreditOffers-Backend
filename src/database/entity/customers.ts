import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { Account } from './accounts';

@Entity('customers')
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  phone: number;

  @Column()
  email: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @OneToMany(() => Account, account => account.customer)
  accounts: Account[];
}
