import { CoreV1Api, KubeConfig, V1Namespace } from "@kubernetes/client-node";

export class KubernetesService {
  private static instance: KubernetesService;
  private k8sApi: CoreV1Api;

  private constructor() {
    const kc = new KubeConfig();
    kc.loadFromDefault();
    this.k8sApi = kc.makeApiClient(CoreV1Api);
  }

  static getInstance(): KubernetesService {
    if (!KubernetesService.instance) {
      KubernetesService.instance = new KubernetesService();
    }
    return KubernetesService.instance;
  }

  async getNamespaces(): Promise<string[]> {
    const namespaces = await this.k8sApi.listNamespace();
    return namespaces.items
      .map((namespace: V1Namespace) => namespace.metadata?.name)
      .filter((name) => name !== undefined) as string[];
  }
}
