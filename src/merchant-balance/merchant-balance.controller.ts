import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Public } from '../common/decorators/public.decorator';
import { FundMerchantBalanceDto } from './dto/fund-merchant-balance.dto';
import { MerchantBalance } from './entities/merchant-balance.entity';
import { MerchantBalanceService } from './merchant-balance.service';

@ApiTags('merchant-balances')
@Public()
@Controller('merchants/:merchantId/balance')
export class MerchantBalanceController {
  constructor(
    private readonly merchantBalanceService: MerchantBalanceService,
  ) {}

  @ApiBadRequestResponse({ description: 'Merchant or balance not found' })
  @ApiOkResponse({
    description: 'Merchant balance details',
    type: MerchantBalance,
  })
  @Get()
  getBalance(
    @Param('merchantId') merchantId: string,
  ): Promise<MerchantBalance> {
    return this.merchantBalanceService.getBalance(merchantId);
  }

  @ApiBadRequestResponse({
    description: 'Merchant not found or invalid funding payload',
  })
  @ApiOkResponse({
    description: 'Merchant balance funded successfully',
    type: MerchantBalance,
  })
  @Post('fund')
  fundBalance(
    @Param('merchantId') merchantId: string,
    @Body() fundMerchantBalanceDto: FundMerchantBalanceDto,
  ): Promise<MerchantBalance> {
    return this.merchantBalanceService.fundBalance(
      merchantId,
      fundMerchantBalanceDto,
    );
  }
}
