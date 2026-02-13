import type {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import type { Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';

import type { ProblemDetails } from '../models';

export const errorInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  return next(request).pipe(
    catchError((error: unknown): Observable<never> => {
      if (error instanceof HttpErrorResponse && error.error) {
        return throwError((): ProblemDetails => error.error);
      }
      return throwError(() => error);
    }),
  );
};
