import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class logindto {
  @ApiProperty({ description: 'Username for teacher', example: 'teacher1' })
  @IsString()
  username: string;
  @ApiProperty({ description: 'password for teacher', example: 'passteacher1' })
  @IsString()
  password: string;
}
