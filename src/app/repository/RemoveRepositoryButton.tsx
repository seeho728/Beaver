"use client";

import { removeRepository } from "@/components/organism/AddRepositoryCard/action";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

export function RemoveRepositoryButton({ name }: { name: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      disabled={isPending}
      onClick={() => startTransition(() => removeRepository(name))}
    >
      삭제
    </Button>
  );
}
