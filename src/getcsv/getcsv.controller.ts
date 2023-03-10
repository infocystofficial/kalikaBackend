import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Put,
  ValidationPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetcsvService } from './getcsv.service';
import { CreateGetcsvDto } from './dto/create-getcsv.dto';
import { UpdateGetcsvDto } from './dto/update-getcsv.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiTags,
} from '@nestjs/swagger/dist';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { importcsv } from './dto/importcsv.dto';
import { studentdatadto } from './dto/studentinput.dto';

//==================================================================//
@Controller('')
@ApiTags('Getting and update result')
export class GetcsvController {
  constructor(private readonly getcsvService: GetcsvService) {}
  //============================================================//

  @UseGuards(AuthGuard('jwt'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Your file description',
    type: 'object',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('/teacher/upload')
  @ApiBearerAuth('jwt-auth')
  @ApiCreatedResponse({ description: 'To upload the csv file ' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './csvFile',
        filename: function (req, file, cb) {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.getcsvService.upload(file);
  }
  //============================================================//
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('jwt-auth')
  @Post('/teacher')
  @ApiBody({
    description: 'Required body for this endpoint',
    type: CreateGetcsvDto,
  })
  @ApiCreatedResponse({
    description: 'require token to post individual data',
    type: CreateGetcsvDto,
  })
  postStudentData(@Body(ValidationPipe) createGetcsvDto: CreateGetcsvDto) {
    return this.getcsvService.postStudentData(createGetcsvDto);
  }

  //============================================================//
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('jwt-auth')
  @Get('/teacher')
  @ApiOkResponse({ description: 'find all the student data ' })
  async findAll(@Query() query: ExpressQuery) {
    return this.getcsvService.findAll(query);
  }
  //===========================================================//
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('jwt-auth')
  @Get('/teacher/:id')
  @ApiOkResponse({
    description: 'Find the student of id ',
    type: CreateGetcsvDto,
  })
  findOne(@Param('id') id: string) {
    return this.getcsvService.findOne(id);
  }
  //============================================================//
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('jwt-auth')
  @Put('/teacher/:id')
  @ApiBody({
    description: 'required field to update student data',
    type: UpdateGetcsvDto,
  })
  @ApiOkResponse({
    description: 'required token to update or edit the sutdent data',
  })
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateGetcsvDto: UpdateGetcsvDto,
  ) {
    return this.getcsvService.update(id, updateGetcsvDto);
  }
  //=============================================================//
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('jwt-auth')
  @Delete('/teacher/:id')
  @ApiOkResponse({ description: 'required token to delete individual data' })
  remove(@Param('id') id: string) {
    return this.getcsvService.remove(id);
  }
  //====================================================================//
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('jwt-auth')
  @Delete('/teacher/all')
  @ApiOkResponse({ description: 'required token to delete all data at once' })
  async deleteall(): Promise<any> {
    return this.getcsvService.deleteall();
  }
  //=================================================================================//
  @Post('/student/input')
  @ApiBody({
    description: 'Required student form to get resutlt',
    type: studentdatadto,
  })
  @ApiOkResponse({ description: 'Display student result' })
  async searchStudent(@Body() body: studentdatadto): Promise<any> {
    return this.getcsvService.searchStudent(body);
  }
}
