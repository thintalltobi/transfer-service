import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateMerchantDto {
  @ApiProperty({
    description: 'Name of merchant',
    example: 'Acme Supplies',
  })
  @IsNotEmpty()
  @MaxLength(120)
  readonly name: string;

  @ApiProperty({
    description: 'Email of merchant',
    example: 'merchant@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  readonly email: string;
}
