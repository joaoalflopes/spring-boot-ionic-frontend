import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

        intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
                console.log("passou por aqui");
                return next.handle(req)
                .catch((error, caught) => {

                        let errorObj = error;
                        if(errorObj.error){
                                errorObj = errorObj.error;
                        }
                        if(!errorObj.status){
                                errorObj = JSON.parse(errorObj);
                        }

                        console.log("Error detected by the interceptor:");
                        console.log(errorObj);
                        

                     return Observable.throw(errorObj);
                }) as any;
        }
}

export const ErrorInterceptorProvider = {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true,

};