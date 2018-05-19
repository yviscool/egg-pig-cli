import { PipeTransform, Injectable, ArgumentMetadata } from 'egg-pig';

@Injectable()
export class <%= name %>Pipe extends PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
