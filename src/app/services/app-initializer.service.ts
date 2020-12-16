import { AppConfigService } from './app-config.service';

export function AppConfigInitializer(appConfigService: AppConfigService) {
  return () => appConfigService.load();
}
