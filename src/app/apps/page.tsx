// app/apps/page.tsx 또는 app/apps/page.server.tsx 등
import NamespaceSelect from "@/components/organism/SelectNamespace";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InstalledApp } from "@/interfaces";
import { AppService } from "@/services/app.services";
import Link from "next/link";
import { KubernetesService } from "../../services/kubernetes.services";

interface SearchParams {
  searchParams: { namespace?: string };
}

export const dynamic = "force-dynamic";

const Apps = async ({ searchParams }: SearchParams) => {
  const namespaces = await KubernetesService.getInstance().getNamespaces();
  const selectedNamespace = searchParams.namespace || namespaces[0];
  const datas = await AppService.list(selectedNamespace);

  return (
    <>
      <NamespaceSelect
        namespaces={namespaces}
        selectedNamespace={selectedNamespace}
      />
      {datas.map((data: InstalledApp, i) => (
        <Card key={i} className="w-full">
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between">
                <span>
                  {data.name} ( {data.chart} )
                </span>
                <span>{data.updated}</span>
              </div>
            </CardTitle>
            <CardDescription>
              <span>{data.namespace}</span>
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link
              href={`/apps/${data.namespace}/${data.name}`}
              className="mr-2"
            >
              <Button>조회</Button>
            </Link>
            <Button>삭제</Button>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default Apps;
