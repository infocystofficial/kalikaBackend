import { Injectable } from '@nestjs/common';
import { unlink } from 'fs/promises';
import * as fs from 'fs';
import * as path from 'path';
import { UpdateGetcsvDto } from './dto/update-getcsv.dto';
import csvParser = require('csv-parser');
import { InjectModel } from '@nestjs/mongoose';
import { getcsv, getcsvdocument } from './schema/getcsv.schema';
import { Model } from 'mongoose';
import { CreateGetcsvDto } from './dto/create-getcsv.dto';
import { Query } from 'express-serve-static-core';
//===================================================================//

@Injectable()
export class GetcsvService {
  constructor(
    @InjectModel(getcsv.name)
    private readonly getcsvModel: Model<getcsvdocument>,
  ) {}
  //===========================================================================================//
  ///upload csv file and store the file in mongodb database converting to json
  async upload(file: Express.Multer.File): Promise<string> {
    try {
      const filepath = path.join(
        __dirname,
        '..',
        '..',
        'csvFile',
        file.originalname,
      );
      fs.createReadStream(filepath, 'utf-8')
        .pipe(csvParser())
        .on('data', (data) => {
          data = JSON.stringify(data);
          data = data.replaceAll(`'`, '');
          data = data.trim();
          data = data.toLowerCase();
          data = data.replace('_', '');
          data = JSON.parse(data);
          const model = new this.getcsvModel();
          model.Name = data.names || data.name || data.Name;
          model.Year = data.years || data.year || data.Year;
          model.RollNo =
            data.rollNo ||
            data.rollno ||
            data.RollNo ||
            data.Rollno ||
            data['Roll-no'];
          model.Class = data.class || data.class || data.Class;
          model.Maths = data.maths || data.math || data.Math || data.Maths;
          model.Science = data.science || data.Science;
          model.Social = data.social || data.socials || data.Social;
          model.English = data.english || data.English;
          model.Account = data.account || data.accounts || data.Account;
          model.Total =
            Number(model.Social) +
            Number(model.English) +
            Number(model.Account) +
            Number(model.Maths) +
            Number(model.Science);
          return model.save();
        })

        .on('end', () => {
          return 'file stored successfully';
        })
        .on('error', () => console.log('Error in saving file'));
      setTimeout(() => {
        unlink(filepath);
      }, 5000);

      return 'File stored successfully ';
    } catch (error) {
      return error;
    }
  }
  //========================================================================================//

  postStudentData(createGetcsvDto: CreateGetcsvDto): Promise<getcsv> {
    try {
      const model = new this.getcsvModel();
      model.Name = createGetcsvDto.Name;
      model.Year = createGetcsvDto.Year;
      model.RollNo = createGetcsvDto.RollNo;
      model.Class = createGetcsvDto.Class;
      model.Maths = createGetcsvDto.Maths;
      model.Science = createGetcsvDto.Science;
      model.Social = createGetcsvDto.Social;
      model.English = createGetcsvDto.English;
      model.Account = createGetcsvDto.Account;
      return model.save();
    } catch (error) {
      return error;
    }
  }
  //===============================================================================================//
  //return all the student list
  async findAll(query: Query): Promise<any> {
    try {
      const queryObj = { ...query };
      const excludefield = ['limit', 'page', 'skip', 'fields'];
      excludefield.map((el) => delete queryObj[el]);
      let querystr = JSON.stringify(queryObj);
      querystr = querystr.replace(
        /\b(gte|gt|lte|lt)\b/,
        (match) => `$${match}`,
      );
      let finalquery = this.getcsvModel.find(JSON.parse(querystr));
      if (query.limit) {
        finalquery = finalquery.limit(Number(query.limit));
      }
      if (query.offset) {
        finalquery = finalquery.skip(Number(query.offset));
      }
      if (query.sort) {
        finalquery = finalquery.sort(String(query.sort));
      }

      return finalquery.exec();
    } catch (error) {
      return error;
    }
  }
  //============================================================================================//

  //return the studen of given object id
  findOne(id: string): Promise<getcsv> {
    try {
      return this.getcsvModel.findById(id).exec();
    } catch (error) {
      return error;
    }
  }
  //========================================================================================//

  update(id: string, updateGetcsvDto: UpdateGetcsvDto) {
    try {
      const model = new this.getcsvModel();
      return this.getcsvModel
        .updateOne(
          { _id: id },
          {
            Name: updateGetcsvDto.Name,
            Class: updateGetcsvDto.Class,
            Year: updateGetcsvDto.Year,
            RollNo: updateGetcsvDto.RollNo,
            Maths: updateGetcsvDto.Maths,
            Science: updateGetcsvDto.Science,
            English: updateGetcsvDto.English,
            Social: updateGetcsvDto.Social,
            Account: updateGetcsvDto.Account,
          },
        )
        .exec();
    } catch (error) {
      return error;
    }
  }
  //======================================================================================//
  remove(id: string) {
    try {
      return this.getcsvModel.deleteOne({ _id: id });
    } catch (error) {
      return error;
    }
  }
  //=====================================================================================//

  async deleteall(): Promise<any> {
    try {
      return this.getcsvModel.deleteMany();
    } catch (error) {
      return error;
    }
  }
}
