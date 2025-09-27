import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';
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

async function writeUsers(users: User[]): Promise<void> {
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
}

export async function POST(request: Request) {
  try {
    const { id, newPassword } = await request.json();

    if (!id || !newPassword) {
      return NextResponse.json({ message: 'ID와 새 비밀번호를 모두 입력해주세요.' }, { status: 400 });
    }

    const users = await readUsers();
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex > -1) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      users[userIndex].password = hashedPassword;
      await writeUsers(users);
      return NextResponse.json({ message: '비밀번호가 성공적으로 변경되었습니다.' }, { status: 200 });
    } else {
      return NextResponse.json({ message: '사용자를 찾을 수 없습니다.' }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
