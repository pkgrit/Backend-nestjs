import { Module } from '@nestjs/common';
import { PageControllers } from './ourpages.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { LibrarySchema } from './pages.schema';
import { LibraryService } from './pages.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'LibraryPage', schema: LibrarySchema }]),
  ],
  controllers: [PageControllers],
  providers: [JwtModule, LibraryService],
})
export class PageModule {}
