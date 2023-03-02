import { ApiOperation, ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
//==========================================================================//
export class CreateGetcsvDto {
  @ApiProperty({ description: 'Class in number', example: 8, required: true })
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
