import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class FundMerchantBalanceDto {
  @ApiProperty({
    description: 'Amount to fund in minor units (kobo/cents)',
    example: 5000,
  })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  readonly amountMinor: number;
}
