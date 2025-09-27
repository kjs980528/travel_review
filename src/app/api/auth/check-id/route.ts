import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { User } from '@/lib/types';

const usersFilePath = path.join(process.cwd(), 'data', 'users.json');

async function readUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(usersFilePath, 'utf-8');
    return JSON.parse(data) as User[];
  } catch (error) {
    // If the file doesn't exist, return an empty array
    if (error instanceof Error && (error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    const users = await readUsers();
    const idExists = users.some((user) => user.id === id);

    if (idExists) {
      return NextResponse.json({ isAvailable: false, message: '이미 사용 중인 아이디입니다.' }, { status: 200 });
    } else {
      return NextResponse.json({ isAvailable: true, message: '사용 가능한 아이디입니다.' }, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
