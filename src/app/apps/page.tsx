import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InstalledApp } from "@/interfaces";
import Link from "next/link";
import { AppRepository } from "../datas/app.repository";

const Apps = async () => {
  const datas = await AppRepository.list();

  const handleDelete = (name: string, namespace: string) => {
    if (!confirm(`정말 삭제하시겠습니까?`)) {
      return;
    }
    AppRepository.deleteApp(name, namespace);
  };
  return (
    <>
      {datas.map((data: InstalledApp, i) => {
        return (
          <Card key={i} className="w-full">
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between">
                  <span>
                    {" "}
                    {data.name} ( {data.chart} )
                  </span>

                  <span>{data.updated}</span>
                </div>
              </CardTitle>
              <CardDescription>
                <span> {data.namespace} </span>
              </CardDescription>
            </CardHeader>

            <CardFooter>
              <Link
                href={`/apps/${data.namespace}/${data.name}`}
                className="mr-2"
              >
                <Button> 조회 </Button>
              </Link>
              <Button> 삭제 </Button>
            </CardFooter>
          </Card>
        );
      })}
    </>
  );
};

export default Apps;
