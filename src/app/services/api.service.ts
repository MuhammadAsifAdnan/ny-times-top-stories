import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';

import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiBasePath: string;

  constructor(private httpClient: HttpClient) {
    this.apiBasePath = AppConfigService.appConfig.apiBasePath;
  }

  fetchTopStories = (section: string): Observable<ResponseModel> => {
    return this.httpClient.get<ResponseModel>(this.apiBasePath + section);
  };
}
