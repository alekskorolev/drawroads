import { Body, Controller, Get, Header, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { IPayload } from './types/payload.d';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @Header('content-type', 'image/svg+xml')
  async data(@Body() body: IPayload): Promise<string> {
    console.log(body);
    const image = await this.appService.generateMap(body);
    return image;
  }
}
