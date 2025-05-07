import { NextRequest, NextResponse } from 'next/server';
import { HelmRepository } from '../../db/helm-repository';

export const GET = async (
  request: NextRequest,
  context: { params: { name: string } }
) => {
  const { name } = context.params;
  return NextResponse.json(await HelmRepository.listCharts(name));
};

export const DELETE = async (
  request: NextRequest,
  context: { params: { name: string } }
) => {
  const { name } = context.params;

  await HelmRepository.remove(name);
  return NextResponse.json(null);
};
