import { RepositorySchema } from '@/interfaces';
import { NextRequest, NextResponse } from 'next/server';
import { HelmRepository } from '../db/helm-repository';
import { CommonException } from '../exception/commonException';

export async function GET(request: Request) {
  return NextResponse.json(await HelmRepository.list());
}

export async function POST(request: NextRequest) {
  const json = await request.json();

  const result = RepositorySchema.safeParse(json);
  if (!result.success) {
    return NextResponse.json(
      new CommonException('JsonParsingError', result.error.message),
      { status: 400 }
    );
  }

  HelmRepository.add(result.data);
  return NextResponse.json({ test: 'hi' });
}

// @TODO: Shortcut bitnami repo, prometheus 등
