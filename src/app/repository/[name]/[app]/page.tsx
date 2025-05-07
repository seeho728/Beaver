"use client";
import { Button } from "@/components/ui/button";
import { HelmAppVersion } from "@/interfaces";
import RepositoryService from "@/services/repository.service";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const RepositoryAppPage = () => {
  const { name, app } = useParams();

  const [datas, setDatas] = useState<HelmAppVersion[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await RepositoryService.listVersions(
        name as string,
        app as string
      );
      setDatas(res.data);
    };
    fetch();
  }, []);

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
