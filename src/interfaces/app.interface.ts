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
