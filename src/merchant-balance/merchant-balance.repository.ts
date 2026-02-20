import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { MerchantBalance } from './entities/merchant-balance.entity';

@Injectable()
export class MerchantBalanceRepository {
  private readonly defaultCurrency = 'NGN';

  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(MerchantBalance)
    private readonly merchantBalanceRepository: Repository<MerchantBalance>,
  ) {}

  async createBalance(merchantId: string): Promise<MerchantBalance> {
    const balance = this.merchantBalanceRepository.create({
      merchantId,
      currency: this.defaultCurrency,
      amountMinor: 0,
    });

    return this.merchantBalanceRepository.save(balance);
  }

  findByMerchantId(merchantId: string): Promise<MerchantBalance | null> {
    return this.merchantBalanceRepository.findOne({
      where: {
        merchantId,
      },
    });
  }

  fundBalance(
    merchantId: string,
    amountMinor: number,
  ): Promise<MerchantBalance> {
    return this.dataSource.transaction(async (manager) => {
      await manager.increment(
        MerchantBalance,
        {
          merchantId,
        },
        'amountMinor',
        amountMinor,
      );

      return manager.findOneOrFail(MerchantBalance, {
        where: {
          merchantId,
        },
      });
    });
  }
}
