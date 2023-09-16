import { IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  userId: number;
}
