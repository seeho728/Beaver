"use client";
import { yaml } from "@codemirror/lang-yaml";
import CodeMirror from "@uiw/react-codemirror";
import React from "react";

interface YamlEditorProps {
  value: string;
  onChange: (value: string) => void;
}
const YamlEditor: React.FC<YamlEditorProps> = ({ value, onChange }) => {
  return (
    <>
      <CodeMirror
        value={value}
        height="500px"
        extensions={[yaml()]}
        onChange={onChange}
      />
    </>
  );
};

export default YamlEditor;
