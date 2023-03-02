import { ApiOperation, ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
//==========================================================================//
export class importcsv {
  @ApiProperty({
    description: 'Class in number',
    required: true,
    type: 'string',
    format: 'binary',
  })
  @IsNotEmpty()
  file: Express.Multer.File;
}
