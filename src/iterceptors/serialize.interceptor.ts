import {
  NestInterceptor,
  ExecutionContext,
  CallHandler, UseInterceptors
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToInstance } from "class-transformer";

interface classConstructor {
  new (...args: any[]): {};
}

export function Serialize(dto: classConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor{
  constructor(private dto: any ) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    // run something before the request is handled by the request handler
    // console.log('I am running before the handler', context);

    return next.handle().pipe(
      map((data: any) => {
        // run something before the response is out
        console.log('I am running before response is sent out', data);
          return plainToInstance(this.dto, data, { excludeExtraneousValues: true });
      }),
    )
  }
}