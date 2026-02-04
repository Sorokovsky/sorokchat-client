import {
  HttpErrorResponse,
  type HttpEvent,
  type HttpHandlerFn,
  type HttpInterceptorFn,
  type HttpRequest
} from '@angular/common/http';
import {catchError, type Observable, throwError} from 'rxjs';
import {type ProblemDetail} from '@/contracts/problem-detail.contract';

export const apiErrorInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  return next(request)
    .pipe(catchError((error: unknown) => {
      if (!(error instanceof HttpErrorResponse)) throw error;
      const httpError = error as HttpErrorResponse;
      const status: number = error.status
      if (httpError.error && typeof httpError.error === "object") {
        const problem = httpError.error as ProblemDetail;
        return throwError(() => problem);
      }
      return throwError((): ProblemDetail => ({
        status,
        title: "Невідома помилка"
      }));
    }));
};
