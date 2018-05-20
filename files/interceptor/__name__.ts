import { Injectable, EggInterceptor, ExecutionContext } from 'egg-pig';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class <%= name %>Interceptor extends EggInterceptor {
  intercept(context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    return stream$.pipe(map((data) => data));
  }
}
