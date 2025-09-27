import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';

const usersFilePath = path.join(process.cwd(), 'data', 'users.json');

async function readUsers() {
  try {
    const data = await fs.readFile(usersFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist, return an empty array
    return [];
  }
}

async function writeUsers(users: any) {
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
}

export async function POST(request: Request) {
  try {
    const { id, password, email, contact } = await request.json();

    if (!id || !password || !email || !contact) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const users = await readUsers();

    const idExists = users.some((user: any) => user.id === id);
    if (idExists) {
      return NextResponse.json({ message: 'ID already exists' }, { status: 409 });
    }

    const emailExists = users.some((user: any) => user.email === email);
    if (emailExists) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id,
      password: hashedPassword,
      email,
      contact,
    };

    users.push(newUser);
    await writeUsers(users);

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
