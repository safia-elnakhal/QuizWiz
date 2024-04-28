import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService) {}


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    
   
    const token = localStorage.getItem('userToken');
    const baseUrl: string = 'https://upskilling-egypt.com:3005/api/'



    let newHeaders = {};
    
    if (token !== null) {

      newHeaders = {
        'Authorization': `Bearer ${token}`
      }
    }
    let cloned = request.clone({
      setHeaders: newHeaders,
      url: baseUrl + request.url
    })



    this.spinner.show();
    


    return next.handle(cloned).pipe(
      finalize(() => {
        this.spinner.hide(); 
      })
    );
  }
}
