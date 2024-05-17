import { Module } from '@nestjs/common';
import { ProcessService } from './process.service';
import { ProcessController } from './process.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Process, ProcessSchema } from './process.schema';
import { SchedulerModule } from 'src/scheduler/scheduler.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Process.name, schema: ProcessSchema }]),
    SchedulerModule,
  ],
  providers: [ProcessService],
  controllers: [ProcessController],
})
export class ProcessModule {}
