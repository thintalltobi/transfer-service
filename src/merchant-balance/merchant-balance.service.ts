import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Merchant } from '../merchant/entities/merchant.entity';
import { FundMerchantBalanceDto } from './dto/fund-merchant-balance.dto';
import { MerchantBalance } from './entities/merchant-balance.entity';
import { MerchantBalanceRepository } from './merchant-balance.repository';

@Injectable()
export class MerchantBalanceService {
  constructor(
    @InjectRepository(Merchant)
    private readonly merchantRepository: Repository<Merchant>,
    private readonly merchantBalanceRepository: MerchantBalanceRepository,
  ) {}

  private async ensureMerchantExists(merchantId: string): Promise<void> {
    const merchant = await this.merchantRepository.findOne({
      where: {
        id: merchantId,
      },
    });

    if (!merchant) {
      throw new BadRequestException('Merchant not found');
    }
  }

  async ensureBalance(merchantId: string): Promise<MerchantBalance> {
    const existingBalance =
      await this.merchantBalanceRepository.findByMerchantId(merchantId);

    if (existingBalance) {
      return existingBalance;
    }

    return this.merchantBalanceRepository.createBalance(merchantId);
  }

  async getBalance(merchantId: string): Promise<MerchantBalance> {
    await this.ensureMerchantExists(merchantId);

    const balance = await this.ensureBalance(merchantId);

    return balance;
  }

  async fundBalance(
    merchantId: string,
    fundMerchantBalanceDto: FundMerchantBalanceDto,
  ): Promise<MerchantBalance> {
    await this.ensureMerchantExists(merchantId);
    await this.ensureBalance(merchantId);

    return this.merchantBalanceRepository.fundBalance(
      merchantId,
      fundMerchantBalanceDto.amountMinor,
    );
  }
}
