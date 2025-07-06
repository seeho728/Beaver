import { HelmService } from "@/services/helm.services";
import { ViewYamlClient } from "./ViewYamlClient";

interface Props {
  params: {
    name: string;
    app: string;
    version: string;
  };
}

const InstallAppPage = async ({ params }: Props) => {
  const { name, app, version } = params;

  const values = await HelmService.getVersion(name, app, version);

  return (
    <ViewYamlClient chart={`${name}/${app}`} version={version} value={values} />
  );
};

export default InstallAppPage;
