import { Injectable } from '@angular/core';
import { AppConfig } from '../models/app-config';
import configJson from '../../assets/config.json';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  static appConfig: AppConfig = new AppConfig();

  constructor() {}

  load() {
    AppConfigService.appConfig = configJson;
  }
}
