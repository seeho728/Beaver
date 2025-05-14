// app/repository/actions.ts
"use server";

import { AppRepository } from "@/app/datas/app.repository";
import { revalidatePath } from "next/cache";

export async function updateApp(formData: FormData) {
  const name = formData.get("name") as string;
  const namespace = formData.get("namespace") as string;
  const values = formData.get("value") as string;

  console.log("@@@@");
  await AppRepository.updateInstalledApp(name, namespace, values);
  revalidatePath("/apps"); // 캐시 갱신
}
