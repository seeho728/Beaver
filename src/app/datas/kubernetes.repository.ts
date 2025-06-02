import { CoreV1Api, KubeConfig, V1Namespace } from "@kubernetes/client-node";

export class KubernetesRepository {
  private static instance: KubernetesRepository;
  private k8sApi: CoreV1Api;

  private constructor() {
    const kc = new KubeConfig();
    kc.loadFromDefault();
    this.k8sApi = kc.makeApiClient(CoreV1Api);
  }

  static getInstance(): KubernetesRepository {
    if (!KubernetesRepository.instance) {
      KubernetesRepository.instance = new KubernetesRepository();
    }
    return KubernetesRepository.instance;
  }

  async getNamespaces(): Promise<string[]> {
    const namespaces = await this.k8sApi.listNamespace();
    return namespaces.items
      .map((namespace: V1Namespace) => namespace.metadata?.name)
      .filter((name) => name !== undefined) as string[];
  }
}
