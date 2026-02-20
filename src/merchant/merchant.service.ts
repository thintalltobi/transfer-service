import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { MysqlErrorCode } from '../common/enums/error-codes.enum';
import { MerchantBalanceService } from '../merchant-balance/merchant-balance.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { Merchant } from './entities/merchant.entity';
import { MerchantRepository } from './merchant.repository';

@Injectable()
export class MerchantService {
  constructor(
    private readonly merchantRepository: MerchantRepository,
    private readonly merchantBalanceService: MerchantBalanceService,
  ) {}

  async create(createMerchantDto: CreateMerchantDto): Promise<Merchant> {
    try {
      const merchant =
        await this.merchantRepository.createMerchant(createMerchantDto);
      await this.merchantBalanceService.ensureBalance(merchant.id);

      return merchant;
    } catch (error) {
      if (error.code === MysqlErrorCode.UniqueViolation) {
        throw new ConflictException(
          `Merchant with email [${createMerchantDto.email}] already exists`,
        );
      }
      throw error;
    }
  }

  findAll(): Promise<Merchant[]> {
    return this.merchantRepository.findMerchants();
  }

  async findOne(id: string): Promise<Merchant> {
    const merchant = await this.merchantRepository.findMerchantById(id);
    if (!merchant) {
      throw new BadRequestException('Merchant not found');
    }

    return merchant;
  }

  async update(
    id: string,
    updateMerchantDto: UpdateMerchantDto,
  ): Promise<Merchant> {
    await this.findOne(id);

    try {
      return await this.merchantRepository.updateMerchant(
        id,
        updateMerchantDto,
      );
    } catch (error) {
      if (error.code === MysqlErrorCode.UniqueViolation) {
        throw new ConflictException(
          `Merchant with email [${updateMerchantDto.email}] already exists`,
        );
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.merchantRepository.softDeleteMerchant(id);
  }
}
