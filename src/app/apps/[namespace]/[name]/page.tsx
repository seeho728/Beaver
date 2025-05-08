import { AppRepository } from "@/app/datas/app.repository";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import yaml from "js-yaml";

interface Props {
  params: {
    name: string;
    namespace: string;
  };
}
const ViewYaml = async ({ params }: Props) => {
  const { namespace, name } = params;

  const data = await AppRepository.getInstalledApp(name, namespace);
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
      <pre>{yaml.dump(yaml.load(data?.value))}</pre>
    </>
  );
};

export default ViewYaml;
