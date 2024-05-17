import { Module } from '@nestjs/common';
import { ProcessModule } from './process/process.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ProcessModule,
  ],
})
export class AppModule {}
