import { exec } from "child_process";
import { promisify } from "util";
import { InstalledApp } from "./app.entity";
const execAsync = promisify(exec);

export class AppRepository {
  static async list(): Promise<InstalledApp[]> {
    const { stdout } = await execAsync("helm list -A -o json");
    return JSON.parse(stdout) as InstalledApp[];
  }

  static async getMetadata(
    name: string,
    namespace: string
  ): Promise<InstalledApp> {
    const { stdout } = await execAsync(
      `helm get metadata ${name} -n ${namespace} -o json`
    );
    return JSON.parse(stdout) as InstalledApp;
  }

  static async getValue(name: string, namespace: string): Promise<string> {
    const { stdout } = await execAsync(
      `helm get values ${name} -n ${namespace} --all`
    );
    return stdout;
  }

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

  static async deleteApp(name: string, namespace: string): Promise<void> {
    await execAsync(`helm uninstall ${name} -n ${namespace} --no-hooks`);
    return;
  }
}
