import { HelmRepository } from "@/app/api/db/helm-repository";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  context: { params: { name: string; app: string } }
) => {
  const { name, app } = context.params;
  return NextResponse.json(await HelmRepository.listVersions(name, app));
};
