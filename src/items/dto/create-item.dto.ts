import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ItemDto {
  @IsNotEmpty()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  author: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  price: number;

  @IsOptional()
  @IsBoolean()
  sold: boolean;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  type: string;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  orderId: number;
}
