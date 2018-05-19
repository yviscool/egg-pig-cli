import { HttpException, HttpStatus } from 'egg-pig';

export class <%= name %>Exception extends HttpException {
  constructor() {
    super('<%= name %>', HttpStatus.NOT_FOUND);
  }
}
