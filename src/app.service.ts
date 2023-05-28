import { Injectable } from '@nestjs/common';import {Csrf} from "ncsrf";

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
