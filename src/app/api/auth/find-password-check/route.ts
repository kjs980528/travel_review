import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const usersFilePath = path.join(process.cwd(), 'data', 'users.json');

async function readUsers() {
  try {
    const data = await fs.readFile(usersFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function POST(request: Request) {
  try {
    const { id, email } = await request.json();

    if (!id || !email) {
      return NextResponse.json({ message: '아이디와 이메일을 모두 입력해주세요.' }, { status: 400 });
    }

    const users = await readUsers();
    const user = users.find((user: any) => user.id === id && user.email === email);

    if (user) {
      return NextResponse.json({ message: '계정이 확인되었습니다.' }, { status: 200 });
    } else {
      return NextResponse.json({ message: '일치하는 사용자 정보가 없습니다.' }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
