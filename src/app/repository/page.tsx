import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { HelmRepository } from "../datas/helm.repository";
import { Charts } from "./charts";

const RepositoryPage = async () => {
  const name = "",
    repository = "",
    username = "",
    password = "";

  const datas = await HelmRepository.list();

  const handleClickUrl = (url: string) => {
    window.open(url);
  };

  const shortCuts = [
    {
      title: "bitnami",
      url: "https://charts.bitnami.com/bitnami",
    },
  ];

  return (
    <>
      {shortCuts.map((shortcut) => {
        return <Button key={shortcut.title}> {shortcut.title} </Button>;
      })}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <span> Add Repository </span>
          </CardTitle>
          <CardDescription> Helm Repository URL </CardDescription>
        </CardHeader>
        <CardContent>
          <Input className="mb-2" value={name} placeholder="name" />
          <Input className="mb-2" value={repository} placeholder="repository" />

          <div className="flex items-center mb-2">
            <Input className="mr-2" placeholder="Username" value={username} />
            <Input type="password" placeholder="Password" value={password} />
          </div>

          <div className="flex justify-end">
            <Button>Create</Button>
          </div>
        </CardContent>
      </Card>
      {datas.map((data, i) => {
        return (
          <Card key={i} className="w-full mt-2">
            <Accordion type="single">
              <AccordionItem value="test">
                <CardHeader>
                  <CardTitle>
                    <AccordionTrigger>
                      <span>{data.name}</span>
                      <a
                        target="_blank"
                        className="ml-2 text-gray-300"
                        href={data.url}
                      >
                        ({data.url})
                      </a>
                    </AccordionTrigger>
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <AccordionContent>
                    <Charts name={data.name} />
                  </AccordionContent>
                </CardContent>

                <CardFooter>
                  <div className="flex-1" />
                  <Button color="error"> 삭제 </Button>
                </CardFooter>
              </AccordionItem>
            </Accordion>
          </Card>
        );
      })}
    </>
  );
};

export default RepositoryPage;
