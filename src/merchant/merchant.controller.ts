import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Public } from '../common/decorators/public.decorator';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { Merchant } from './entities/merchant.entity';
import { MerchantService } from './merchant.service';

@ApiTags('merchants')
@Public()
@Controller('merchants')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @ApiConflictResponse({ description: 'Merchant already exists' })
  @ApiBadRequestResponse({ description: 'Invalid merchant payload' })
  @ApiCreatedResponse({
    description: 'Merchant created successfully',
    type: Merchant,
  })
  @Post()
  create(@Body() createMerchantDto: CreateMerchantDto): Promise<Merchant> {
    return this.merchantService.create(createMerchantDto);
  }

  @ApiOkResponse({
    description: 'List of merchants',
    type: Merchant,
    isArray: true,
  })
  @Get()
  findAll(): Promise<Merchant[]> {
    return this.merchantService.findAll();
  }

  @ApiBadRequestResponse({ description: 'Merchant not found' })
  @ApiOkResponse({ description: 'Merchant details', type: Merchant })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Merchant> {
    return this.merchantService.findOne(id);
  }

  @ApiConflictResponse({ description: 'Merchant email already exists' })
  @ApiBadRequestResponse({
    description: 'Invalid merchant payload or merchant not found',
  })
  @ApiOkResponse({
    description: 'Merchant updated successfully',
    type: Merchant,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMerchantDto: UpdateMerchantDto,
  ): Promise<Merchant> {
    return this.merchantService.update(id, updateMerchantDto);
  }

  @ApiBadRequestResponse({ description: 'Merchant not found' })
  @ApiNoContentResponse({ description: 'Merchant deleted successfully' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.merchantService.remove(id);
  }
}
