import { Injectable, CanActivate, ExecutionContext } from 'egg-pig';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class <%= name %>Guard extends CanActivate {

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
