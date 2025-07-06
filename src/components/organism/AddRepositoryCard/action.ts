// app/repository/actions.ts
"use server";

import { HelmService } from "@/services/helm.services";
import { revalidatePath } from "next/cache";

export async function addRepository(formData: FormData) {
  const name = formData.get("name") as string;
  const url = formData.get("url") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!name || !url) return;

  await HelmService.add({ name, url, username, password });
  revalidatePath("/repository"); // 캐시 갱신
}

export async function removeRepository(name: string) {
  await HelmService.remove(name);
  revalidatePath("/repository"); // 캐시 갱신
}
