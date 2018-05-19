import { Catch, HttpException, ExceptionFilter } from 'egg-pig';

@Catch(HttpException)
export class <%= name %>Filter extends ExceptionFilter {
  catch(exception: HttpException, client) {}
}
