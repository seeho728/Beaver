// app/repository/actions.ts
"use server";

import { AppService } from "@/services/app.services";
import { revalidatePath } from "next/cache";

export async function updateApp(formData: FormData) {
  const name = formData.get("name") as string;
  const namespace = formData.get("namespace") as string;
  const values = formData.get("value") as string;

  await AppService.updateInstalledApp(name, namespace, values);
  revalidatePath("/apps"); // 캐시 갱신
}
