import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type getcsvdocument = getcsv & Document;

@Schema()
export class getcsv {
  @Prop()
  Year: Date;
  @Prop()
  Name: string;
  @Prop()
  RollNo: Number;
  @Prop()
  Class: Number;
  @Prop()
  Maths: Number;
  @Prop()
  Science: Number;
  @Prop()
  Account: Number;
  @Prop()
  Social: Number;
  @Prop()
  English: Number;
  @Prop()
  Total: Number;
}
export const GetcsvSchema = SchemaFactory.createForClass(getcsv);
