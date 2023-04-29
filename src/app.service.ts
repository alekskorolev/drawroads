import { Injectable } from '@nestjs/common';
import { IPayload } from './types/payload.d';
import { Base64, IResult } from './types/result';
import svg from './svg';
import svg64 from 'svg64';
import png from './png';

@Injectable()
export class AppService {
  async generateMap(data: IPayload): Promise<any> {
    return png(data);
  }
}
