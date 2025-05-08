import { HelmRepository } from "@/app/datas/helm.repository";

interface Props {
  params: {
    name: string;
    app: string;
    version: string;
  };
}

const InstallAppPage = async ({ params }: Props) => {
  const { name, app, version } = params;

  const list = await HelmRepository.list();

  return <div>{`Installing ${app} (${version}) from ${name}`}</div>;
};

export default InstallAppPage;
