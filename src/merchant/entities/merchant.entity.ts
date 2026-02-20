import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';

import { MerchantBalance } from '../../merchant-balance/entities/merchant-balance.entity';

@Entity({
  name: 'merchants',
})
export class Merchant {
  @ApiProperty({
    description: 'ID of merchant',
    example: '89c018cc-8a77-4dbd-94e1-dbaa710a2a9c',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Unique public reference of merchant',
    example: '4ad87755-227d-4f25-b131-7d79f8fcd74d',
  })
  @Column({
    type: 'char',
    length: 36,
    unique: true,
  })
  @Generated('uuid')
  reference: string;

  @ApiProperty({
    description: 'Name of merchant',
    example: 'Acme Supplies',
  })
  @Column({
    length: 120,
  })
  name: string;

  @ApiProperty({
    description: 'Email of merchant',
    example: 'merchant@example.com',
  })
  @Column({
    unique: true,
  })
  email: string;

  @OneToOne(() => MerchantBalance, (balance) => balance.merchant)
  balance: Relation<MerchantBalance>;

  @ApiProperty({ description: 'Created date of merchant' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated date of merchant' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
