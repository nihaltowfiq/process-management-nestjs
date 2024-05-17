import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get('/')
  getAllProcess() {
    return {
      name: '⚡️Welcome to the server!',
    };
  }
}
