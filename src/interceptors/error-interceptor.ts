import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

        intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
                console.log("passou pelo interceptor");
                return next.handle(req)
                        .pipe(
                                catchError(error => {

                                 //       let errorObj = error;
                                 //       if(errorObj.error) {
                                 //               errorObj = errorObj.error;
                                 //       }
                                 //       if(!errorObj.status) {
                                 //               errorObj = JSON.parse(errorObj);
                                 //       }
        
                                 //       console.log("Error detected by the interceptor:");
                                 //      console.log(errorObj);
                                        
        
                                return Observable.throw(error);
                        }))as any;
        }
}

export const ErrorInterceptorProvider = {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true,

};