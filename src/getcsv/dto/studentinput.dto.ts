import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
//==========================================================================//
export class studentdatadto {
  @ApiProperty({ description: 'Class in number', example: 9, required: true })
  @IsNotEmpty()
  Class: Number;

  @ApiProperty({ description: 'Rollno of student', example: 11 })
  @IsNotEmpty()
  @IsNumber()
  RollNo: Number;

  @ApiProperty({ description: 'Date of joining', example: '2014' })
  @IsNotEmpty()
  Year: Date;
}
