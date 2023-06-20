import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { addLibrary } from './pages.dto';
import { userActvities } from './pages.interface';
import { Model } from 'mongoose';

@Injectable()
export class LibraryService {
  constructor(
    @InjectModel('LibraryPage') private LibraryModel: Model<userActvities>,
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
