import { NextRequest, NextResponse } from 'next/server';
import { AppRepository } from '../../app.repository';
import { AppService } from '../../app.service';

export const GET = async (
  req: NextRequest,
  context: { params: { namespace: string; name: string } }
) => {
  const { name, namespace } = context.params;

  return NextResponse.json(await AppService.getInstalledApp(name, namespace));
};

export const DELETE = async (
  req: NextRequest,
  context: { params: { name: string; namespace: string } }
) => {
  const { name, namespace } = context.params;
  await AppRepository.deleteApp(name, namespace);
  return NextResponse.json(null);
};
