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
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: '이메일을 입력해주세요.' }, { status: 400 });
    }

    const users = await readUsers();
    const user = users.find((user) => user.email === email);

    if (user) {
      return NextResponse.json({ id: user.id }, { status: 200 });
    } else {
      return NextResponse.json({ message: '해당 이메일로 가입된 아이디가 없습니다.' }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
