import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getCurrentTimeAndDate } from 'src/common/utils';
import { Process } from 'src/process/process.schema';

@Injectable()
export class SchedulerService {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    @InjectModel(Process.name) private processModel: Model<Process>,
  ) {}

  startScheduler(pid: number) {
    const job = new CronJob('*/5 * * * * *', async () => {
      try {
        await this.processModel.updateOne(
          { pid },
          { $push: { logs: getCurrentTimeAndDate({ isSecond: true }) } },
        );
        console.log(`Updated logs PID:${pid}`);
      } catch (error) {
        console.error(`Error updating logs - PID:${pid}`, error.message);
      }
    });

    this.schedulerRegistry.addCronJob(pid.toString(), job);
    job.start();
  }

  stopScheduler(pid: number) {
    const doesExist = this.schedulerRegistry.doesExist('cron', pid.toString());
    if (!doesExist) return;

    const job = this.schedulerRegistry.getCronJob(pid.toString());
    if (job) {
      job?.stop();
      this.schedulerRegistry.deleteCronJob(pid.toString());
    }
  }
}
