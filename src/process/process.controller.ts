import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProcessDto } from './process.dto';
import { ProcessService } from './process.service';

@Controller('')
export class ProcessController {
  constructor(private processService: ProcessService) {}

  @Get('/get-all')
  getAllProcess() {
    return this.processService.findAll();
  }

  @Get('/get-single/:pid')
  getSingleProcess(@Param('pid', ParseIntPipe) pid: number) {
    return this.processService.findOne(pid);
  }

  @Post('/create-process')
  createProcess(@Body(ValidationPipe) data: CreateProcessDto) {
    return this.processService.create(data);
  }

  @Delete('/delete-process/:pid')
  deleteProcess(@Param('pid', ParseIntPipe) pid: number) {
    return this.processService.delete(pid);
  }
}
