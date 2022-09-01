import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";


@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    request: any = null;

    constructor(
        private router: Router
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    // console.log('Event',event);
                }
            }, error => {
                if (error instanceof HttpErrorResponse) {
                    console.log('Error from api', error);
                }
            })
        );
    }
}