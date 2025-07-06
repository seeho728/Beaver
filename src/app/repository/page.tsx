import { AddRepositoryCard } from "@/components/organism/AddRepositoryCard/AddRepositoryCard";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HelmService } from "../../services/helm.services";
import { Charts } from "./charts";
import { RemoveRepositoryButton } from "./RemoveRepositoryButton";

const RepositoryPage = async () => {
  const datas = await HelmService.list();

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

      <AddRepositoryCard />

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
                  <RemoveRepositoryButton name={data.name} />
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
