import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { Merchant } from './entities/merchant.entity';

@Injectable()
export class MerchantRepository {
  constructor(
    @InjectRepository(Merchant)
    private readonly merchantRepository: Repository<Merchant>,
  ) {}

  createMerchant(dto: CreateMerchantDto): Promise<Merchant> {
    const merchant = this.merchantRepository.create(dto);
    return this.merchantRepository.save(merchant);
  }

  findMerchants(): Promise<Merchant[]> {
    return this.merchantRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findMerchantById(id: string): Promise<Merchant | null> {
    return this.merchantRepository.findOne({
      where: {
        id,
      },
    });
  }

  async updateMerchant(id: string, dto: UpdateMerchantDto): Promise<Merchant> {
    const merchant = await this.merchantRepository.findOneOrFail({
      where: { id },
    });
    const payload = this.merchantRepository.merge(merchant, dto);
    return this.merchantRepository.save(payload);
  }

  softDeleteMerchant(id: string): Promise<void> {
    return this.merchantRepository.softDelete({ id }).then(() => undefined);
  }
}
