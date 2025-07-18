import { exec } from "child_process";
import { promisify } from "util";

import { InstalledApp } from "@/interfaces";
import { promises as fs } from "fs";
import { tmpdir } from "os";
import { join } from "path";
const execAsync = promisify(exec);

export class AppService {
  static async list(namespace = "default"): Promise<InstalledApp[]> {
    const { stdout } = await execAsync(`helm list -n ${namespace} -o json`);
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
    const installedApp: InstalledApp = await AppService.getMetadata(
      name,
      namespace
    );

    const values = await AppService.getValue(name, namespace);

    installedApp.value = values;

    return installedApp;
  }

  static async updateInstalledApp(
    name: string,
    namespace: string,
    values: string
  ): Promise<void> {
    // @TODO: change bitnami/postgresql
    const tempFile = join(tmpdir(), `${name}-values.yaml`);
    await fs.writeFile(tempFile, values, "utf8");

    await execAsync(
      `helm upgrade ${name} bitnami/postgresql -n ${namespace} -f ${tempFile}`
    );

    await fs.unlink(tempFile); // cleanup
    await execAsync(
      `helm upgrade ${name} -n ${namespace} bitnami/postgresql -f - <<EOF\n${values}\nEOF`
    );
    return;
  }

  static async deleteApp(name: string, namespace: string): Promise<void> {
    await execAsync(`helm uninstall ${name} -n ${namespace} --no-hooks`);
    return;
  }
}
