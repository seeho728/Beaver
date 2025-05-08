import React from "react";
import { HelmRepository } from "../datas/helm.repository";

interface ChartsProps {
  name: string;
}
export const Charts: React.FC<ChartsProps> = async ({ name }) => {
  const data = await HelmRepository.listCharts(name);

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
