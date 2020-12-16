import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from '../services/app-config.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    httpRequest = httpRequest.clone({
      url:
        httpRequest.url + `.json?api-key=${AppConfigService.appConfig.apiKey}`,
    });

    return next.handle(httpRequest);
  }
}
