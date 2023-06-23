import { Document } from 'mongoose';

export interface UploadedImage extends Document {
  userid: string;
  imageaddress: string;
}
