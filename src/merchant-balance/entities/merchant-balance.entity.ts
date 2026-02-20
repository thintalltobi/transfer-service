import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';

import { Merchant } from '../../merchant/entities/merchant.entity';

@Entity({
  name: 'merchant_balances',
})
export class MerchantBalance {
  @ApiProperty({
    description: 'ID of merchant balance',
    example: '89c018cc-8a77-4dbd-94e1-dbaa710a2a9c',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Merchant ID tied to this balance',
    example: '89c018cc-8a77-4dbd-94e1-dbaa710a2a9c',
  })
  @Column({
    name: 'merchant_id',
    unique: true,
  })
  merchantId: string;

  @OneToOne(() => Merchant, (merchant) => merchant.balance, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'merchant_id' })
  merchant: Relation<Merchant>;

  @ApiProperty({
    description: 'Currency code of balance',
    example: 'NGN',
  })
  @Column({
    length: 3,
    default: 'NGN',
  })
  currency: string;

  @ApiProperty({
    description: 'Balance in minor units (kobo/cents)',
    example: 0,
  })
  @Column({
    name: 'amount_minor',
    type: 'bigint',
    default: 0,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => Number(value),
    },
  })
  amountMinor: number;

  @ApiProperty({ description: 'Created date of balance' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated date of balance' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
