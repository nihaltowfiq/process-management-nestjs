import { Injectable, NotFoundException } from '@nestjs/common';
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
    const data = await this.processModel.find({}, { _id: 0, __v: 0 });
    return data;
  }

  async findOne(pid: number): Promise<Process> {
    const data = await this.processModel.findOne({ pid }, { _id: 0, __v: 0 });

    if (!data) throw new NotFoundException('Process not found');

    return data;
  }

  async delete(pid: number): Promise<Process> {
    const data = await this.processModel.findOneAndDelete({ pid });
    if (!data) throw new NotFoundException('Process not found');

    this.schedulerService.stopScheduler(pid);
    return data;
  }
}
