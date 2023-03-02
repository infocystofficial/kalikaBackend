import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateGetcsvDto } from './create-getcsv.dto';

export class UpdateGetcsvDto extends PartialType(CreateGetcsvDto) {
  @ApiProperty({ description: 'Class in number', example: 8 })
  @IsNotEmpty()
  Class: number;

  @ApiProperty({ description: 'Name of student', example: 'ramesh' })
  @IsNotEmpty()
  @IsString()
  Name: string;

  @ApiProperty({ description: 'Rollno of student', example: 31 })
  @IsNotEmpty()
  @IsNumber()
  RollNo: number;

  @ApiProperty({ description: 'Date of joining', example: '2002' })
  @IsNotEmpty()
  Year: Date;

  @ApiProperty({ description: 'maths marks', example: 45 })
  @IsNumber()
  Maths: number;

  @ApiProperty({ description: 'english marks', example: 56 })
  @IsNumber()
  English: number;

  @ApiProperty({ description: 'Account marks', example: 66 })
  @IsNumber()
  Account: number;

  @ApiProperty({ description: 'Science marks', example: 67 })
  @IsNumber()
  Science: number;

  @ApiProperty({ description: 'Social marks', example: 75 })
  @IsNumber()
  Social: number;
}
