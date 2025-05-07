import { InstalledApp } from './app.entity';
import { AppRepository } from './app.repository';

export class AppService {
  static async getInstalledApp(
    name: string,
    namespace: string
  ): Promise<InstalledApp> {
    const installedApp: InstalledApp = await AppRepository.getMetadata(
      name,
      namespace
    );

    const values = await AppRepository.getValue(name, namespace);

    installedApp.value = values;

    return installedApp;
  }
}
