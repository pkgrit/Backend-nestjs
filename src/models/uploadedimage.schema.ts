import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UploadedImage {
  @Prop()
  userid: string;

  @Prop()
  imageaddress: string;
}
export const UploadImageSchema = SchemaFactory.createForClass(UploadedImage);
