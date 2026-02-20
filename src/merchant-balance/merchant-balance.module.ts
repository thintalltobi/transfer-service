import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Merchant } from '../merchant/entities/merchant.entity';
import { MerchantBalance } from './entities/merchant-balance.entity';
import { MerchantBalanceController } from './merchant-balance.controller';
import { MerchantBalanceRepository } from './merchant-balance.repository';
import { MerchantBalanceService } from './merchant-balance.service';

@Module({
  imports: [TypeOrmModule.forFeature([Merchant, MerchantBalance])],
  controllers: [MerchantBalanceController],
  providers: [MerchantBalanceService, MerchantBalanceRepository],
  exports: [MerchantBalanceService],
})
export class MerchantBalanceModule {}
