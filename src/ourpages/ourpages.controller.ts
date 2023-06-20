import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Param,
  UseGuards,
  HttpStatus,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { addLibrary } from './pages.dto';
import { LibraryService } from './pages.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import * as path from 'path';

interface FileParams {
  name: string;
}

@Controller('pages')
export class PageControllers {
  constructor(private readonly libraryService: LibraryService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  function1() {
    return ' you are inside the page. if you are unauthorized perosn then quickly logout';
  }

  @Get('data/:id')
  async alldata(@Res() response: Response, @Param('id') userId: string) {
    try {
      const allimages = await this.libraryService.getImages(userId);
      if (allimages?.length > 0) {
        return response.status(HttpStatus.OK).json({
          message: ' images found successfully',
          allimages,
        });
      }
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('data/status/:id')
  async unseenCount(@Res() response: Response, @Param('id') userId: string) {
    try {
      const count = await this.libraryService.unseenCount(userId);
      return response.status(HttpStatus.OK).json({
        count,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post('data')
  async addimages(@Res() response: Response, @Body() addLibrary: addLibrary) {
    try {
      const newimage = await this.libraryService.AddtoLibrary(addLibrary);
      return response.json({ message: 'images added to you list', newimage });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: image not added!',
        error: 'Bad Request',
      });
    }
  }

  // manually upload the image
  @Post('data/upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './src/assets',
        filename: (req, file, callback) => {
          callback(null, `${file.originalname}`);
        },
      }),
    }),
  )
  async uploadFile(@Res() res, @UploadedFile() file: Express.Multer.File) {
    // console.log(file);
    return res.status(HttpStatus.OK).json({
      success: true,
      data: file.path,
    });
  }

  //  Serve the uploaded image

  @Get('data/upload/img')
  getFile(@Res() res: Response, @Body() file: FileParams) {
    res.sendFile(path.join(__dirname, '../../src/assets/' + file.name));
  }

  @Delete('data/:id')
  async deleteimage(@Res() response: Response, @Param('id') imageId: string) {
    try {
      const deletedimage = await this.libraryService.deleteImage(imageId);
      return response.status(HttpStatus.OK).json({
        message: 'image deleted successfully',
        deletedimage,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
