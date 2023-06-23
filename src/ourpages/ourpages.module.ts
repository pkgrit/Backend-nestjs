import { Module } from '@nestjs/common';
import { PageControllers } from './ourpages.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { LibrarySchema } from './pages.schema';
import { LibraryService } from './pages.service';
import { UploadImageSchema } from 'src/models/uploadedimage.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'LibraryPage', schema: LibrarySchema }]),
    MongooseModule.forFeature([
      { name: 'UploadImage', schema: UploadImageSchema },
    ]),
  ],
  controllers: [PageControllers],
  providers: [JwtModule, LibraryService],
})
export class PageModule {}
