/**
 * example:
 * ```  json  
 * [
    {
        "name": "postgresql",
        "namespace": "default",
        "revision": "1",
        "updated": "2025-04-11 23:55:22.917966 +0900 KST",
        "status": "deployed",
        "chart": "postgresql-16.6.3",
        "app_version": "17.4.0"
    }
]
 */
export interface InstalledApp {
  name: string;

  namespace: string;

  revision: string;

  updated: string;

  status: string;

  chart: string;

  app_version: string;

  value?: string;
}
