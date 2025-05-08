import { HelmRepository } from "@/app/datas/helm.repository";
import { Button } from "@/components/ui/button";
import { HelmAppVersion } from "@/interfaces";
import Link from "next/link";

interface Props {
  params: {
    name: string;
    app: string;
  };
}
const RepositoryAppPage = async ({ params }: Props) => {
  const { name, app } = params;

  const datas = await HelmRepository.listVersions(name, app);

  return (
    <>
      <div className="text-xl font-bold">
        {name}/{app}
      </div>

      <div className="mt-2">
        {datas.map((data: HelmAppVersion, i) => {
          return (
            <div key={i}>
              <div className="flex justify-between font-bold">
                <span>
                  Version: {data.version} / AppVersion: {data.app_version}
                </span>

                <Link href={`/repository/${name}/${app}/${data.version}`}>
                  <Button> 설치 </Button>
                </Link>
              </div>
              <div className="mb-4">
                <span> {data.description} </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RepositoryAppPage;
