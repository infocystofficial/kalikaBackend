import { Module } from '@nestjs/common';
import { GetcsvService } from './getcsv.service';
import { GetcsvController } from './getcsv.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GetcsvSchema, getcsv } from './schema/getcsv.schema';
import { CsvModule } from 'nest-csv-parser';

@Module({
  controllers: [GetcsvController],
  providers: [GetcsvService],
  imports: [
    MongooseModule.forFeature([
      { name: getcsv.name, schema: GetcsvSchema, collection: 'StudentData' },
    ]),
    CsvModule,
  ],
})
export class GetcsvModule {}
