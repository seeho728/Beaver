import React from "react";
import { HelmService } from "../../services/helm.services";

interface ChartsProps {
  name: string;
}
export const Charts: React.FC<ChartsProps> = async ({ name }) => {
  const data = await HelmService.listCharts(name);

  return (
    <>
      {data.map((d) => {
        return (
          <div>
            <a href={`/repository/${d.name}`}>
              {d.name} : {d.version}
            </a>
          </div>
        );
      })}
    </>
  );
};
