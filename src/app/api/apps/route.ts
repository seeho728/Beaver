import { NextRequest, NextResponse } from 'next/server';
import { AppRepository } from './app.repository';

export const GET = async (req: NextRequest) => {
  return NextResponse.json(await AppRepository.list());
};
