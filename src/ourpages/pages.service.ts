import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UploadedImageDto, addLibrary } from './pages.dto';
import { uploadImageInterface, userActvities } from './pages.interface';
import { Model } from 'mongoose';
import { Response } from 'express';
import * as path from 'path';

@Injectable()
export class LibraryService {
  constructor(
    @InjectModel('LibraryPage') private LibraryModel: Model<userActvities>,
    @InjectModel('UploadImage')
    private UploadImageModel: Model<uploadImageInterface>,
  ) {}

  async AddtoLibrary(addLibrary: addLibrary): Promise<userActvities> {
    const newimage = new this.LibraryModel(addLibrary);
    return await newimage.save();
  }

  async getImages(userid: string): Promise<userActvities[]> {
    const libraryimages = await this.LibraryModel.find({ userid: userid });

    if (libraryimages?.length <= 0) {
      throw new NotFoundException('user data not found :(');
    } else {
      const countupdate = await this.LibraryModel.updateMany({
        userid: userid,
        seen: true,
      });
    }
    return libraryimages;
  }

  async saveUploadedImage(
    uploadimage: UploadedImageDto,
  ): Promise<uploadImageInterface> {
    const newuploadedimage = new this.UploadImageModel(uploadimage);
    return await newuploadedimage.save();
  }

  async getUploadedImage(userid: string): Promise<uploadImageInterface[]> {
    const uploadedImages = await this.UploadImageModel.find({ userid: userid });

    if (uploadedImages?.length <= 0) {
      throw new NotFoundException('user data not found :(');
    } else {
      // console.log(uploadedImages);
      return uploadedImages;
    }
  }

  async unseenCount(userid: string) {
    const unseenCount = await this.LibraryModel.find({
      userid: userid,
      seen: false,
    });
    return unseenCount?.length;
  }

  async deleteImage(imageid: string): Promise<userActvities> {
    const deleteImage = await this.LibraryModel.findByIdAndDelete(imageid);

    if (!deleteImage) {
      throw new NotFoundException('Image not deleted');
    }
    return deleteImage;
  }
}
