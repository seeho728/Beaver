import { Repository } from "@/interfaces";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export class HelmRepository {
  static async add(repository: Repository): Promise<void> {
    let cmd = `helm repo add ${repository.name} ${repository.url}`;

    if (repository.username && repository.password) {
      cmd += ` --username ${repository.username} --password ${repository.password}`;
    }
    await execAsync(cmd);
  }

  static async remove(name: string): Promise<void> {
    const cmd = `helm repo remove ${name}`;
    await execAsync(cmd);
  }

  static async update(): Promise<void> {
    const cmd = `helm repo update`;
    await execAsync(cmd);
  }

  static async list() {
    try {
      const { stdout } = await execAsync("helm repo list");
      const lines = stdout.trim().split("\n").slice(1);
      console.log(lines);

      return lines.map((line) => {
        const [name, url] = line.trim().split(/\s+/);
        return { name, url };
      });
    } catch (error: any) {
      return [];
    }
  }

  static async listCharts(name: string) {
    const { stdout } = await execAsync(`helm search repo ${name}/ -o json`);

    return JSON.parse(stdout);
  }

  static async listVersions(name: string, app: string) {
    const { stdout } = await execAsync(
      `helm search repo ${name}/${app} --versions -o json`
    );

    return JSON.parse(stdout).filter((item) => item.name === `${name}/${app}`);
  }
}
