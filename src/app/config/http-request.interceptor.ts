import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from "rxjs/internal/Observable";
import {tap} from "rxjs/operators";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('Authorization');

    req = req.clone({
      withCredentials: true,
    });

    if (token && !req.headers.has('Authorization')) {

      const authReqWithBearer = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });

      return next.handle(authReqWithBearer);
    }

    return next.handle(req);
  }

}
