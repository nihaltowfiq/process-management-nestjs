import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateProcessDto } from './process.dto';
import { ProcessService } from './process.service';

@Controller('')
export class ProcessController {
  constructor(private processService: ProcessService) {}

  @Get('/api/get-all')
  getAllProcess() {
    return this.processService.findAll();
  }

  @Get('/api/get-single/:pid')
  getSingleProcess(@Param('pid', ParseIntPipe) pid: number) {
    console.log(pid);

    return this.processService.findOne(pid);
  }

  @Post('/api/create-process')
  createProcess(@Body() data: CreateProcessDto) {
    return this.processService.create(data);
  }

  @Delete('/api/delete-process/:pid')
  deleteProcess(@Param('pid', ParseIntPipe) pid: number) {
    return this.processService.delete(pid);
  }
}
