// components/NamespaceSelect.tsx
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  namespaces: string[];
  selectedNamespace: string;
}

export default function NamespaceSelect({
  namespaces,
  selectedNamespace,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("namespace", value);
    router.push(`?${params.toString()}`);
  };

  return (
    <Select value={selectedNamespace} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="default" />
      </SelectTrigger>
      <SelectContent>
        {namespaces.map((ns) => (
          <SelectItem key={ns} value={ns}>
            {ns}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
