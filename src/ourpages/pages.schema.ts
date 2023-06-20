import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class LibraryPage {
  @Prop()
  userid: string;

  @Prop()
  url: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  tags: String;

  @Prop({ default: false })
  seen: boolean;
}

export const LibrarySchema = SchemaFactory.createForClass(LibraryPage);
