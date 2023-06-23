import { Document } from 'mongoose';

export interface userActvities extends Document {
  readonly userid: String;
  url: String;
  tags: String;
  seen: Boolean;
  createdAt: Date;
}

export interface uploadImageInterface extends Document {
  userid: String;
  imageaddress: string;
}
