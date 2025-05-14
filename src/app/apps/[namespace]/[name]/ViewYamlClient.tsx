"use client";

import YamlEditor from "@/components/organism/YamlEditor/YamlEditor";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { updateApp } from "./action";

interface ViewYamlClientProps {
  name: string;
  namespace: string;
  value: string;
}
export const ViewYamlClient: React.FC<ViewYamlClientProps> = ({
  name,
  namespace,
  value,
}) => {
  const [data, setData] = useState(value);

  return (
    <>
      <form action={updateApp}>
        <input type="hidden" name="name" value={name} />
        <input type="hidden" name="namespace" value={namespace} />
        <input type="hidden" name="value" value={data} />

        <div className="my-4 flex justify-end">
          <Button> 저장 </Button>
        </div>

        <YamlEditor value={data} onChange={setData} />
      </form>
    </>
  );
};
