import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppService } from "@/services/app.services";
import { ViewYamlClient } from "./ViewYamlClient";

interface Props {
  params: {
    name: string;
    namespace: string;
  };
}
const ViewYaml = async ({ params }: Props) => {
  const { namespace, name } = await params;

  const data = await AppService.getInstalledApp(name, namespace);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between">
              <span>
                {" "}
                {data.name} ( {data.chart} )
              </span>

              <span>{data.deployedAt}</span>
            </div>
          </CardTitle>
          <CardDescription>
            <span> {data.namespace} </span>
          </CardDescription>
        </CardHeader>
      </Card>

      <ViewYamlClient value={data.value} name={name} namespace={namespace} />
    </>
  );
};

export default ViewYaml;
