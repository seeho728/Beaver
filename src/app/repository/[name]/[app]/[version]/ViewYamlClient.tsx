"use client";

import YamlEditor from "@/components/organism/YamlEditor/YamlEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

interface ViewYamlClientProps {
  chart: string;
  version: string;
  value: string;
}
export const ViewYamlClient: React.FC<ViewYamlClientProps> = ({
  chart,
  version,
  value,
}) => {
  const [name, setName] = useState("");
  const [data, setData] = useState(value);

  return (
    <>
      <form>
        <div className="my-4">
          <Input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.name)}
            placeholder="앱 이름을 입력하세요."
          />
        </div>

        <div className="flex">
          <Input name="chart" value={chart} disabled />
          <Input name="version" value={version} disabled />
        </div>

        <Input type="hidden" name="value" value={data} />

        <div className="my-4 flex justify-end">
          <Button> 설치 </Button>
        </div>

        <YamlEditor value={data} onChange={setData} />
      </form>
    </>
  );
};
