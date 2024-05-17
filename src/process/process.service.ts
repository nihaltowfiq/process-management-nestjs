import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Process } from './process.schema';
import { Model } from 'mongoose';
import { CreateProcessDto } from './process.dto';
import { generateUniqueId, getCurrentTimeAndDate } from 'src/common/utils';
import { SchedulerService } from 'src/scheduler/scheduler.service';

@Injectable()
export class ProcessService {
  constructor(
    @InjectModel(Process.name) private readonly processModel: Model<Process>,
    private readonly schedulerService: SchedulerService,
  ) {}

  async create(createProcessDto: CreateProcessDto): Promise<Process> {
    const pid = generateUniqueId();
    const data: Process = await this.processModel.create({
      pid,
      creation_time: getCurrentTimeAndDate(),
      ...createProcessDto,
    });
    this.schedulerService.startScheduler(pid);
    return data;
  }

  async findAll(): Promise<Process[]> {
    const data = await this.processModel.find(
      {},
      { pid: 1, creation_time: 1, name: 1, _id: 0 },
    );
    return data;
  }

  async findOne(pid: number): Promise<Process> {
    const data = await this.processModel.findOne({ pid }, { _id: 0, logs: 1 });
    return data;
  }

  async delete(pid: number): Promise<Process> {
    const data = await this.processModel.findOneAndDelete({ pid });
    this.schedulerService.stopScheduler(pid);
    return data;
  }
}
