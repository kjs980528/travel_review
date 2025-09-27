'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FindCredentialsPage() {
  const [view, setView] = useState('find-id'); // 'find-id' or 'find-password'
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleFindId = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    const response = await fetch('/api/auth/find-id', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (response.ok) {
      alert(`찾으시는 아이디는 [ ${data.id} ] 입니다.`);
    } else {
      setMessage(data.message || '오류가 발생했습니다.');
    }
  };

  const handleFindPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    const response = await fetch('/api/auth/find-password-check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, email }),
    });
    const data = await response.json();
    if (response.ok) {
      router.push(`/reset-password?id=${id}`);
    } else {
      setMessage(data.message || '오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            아이디/비밀번호 찾기
          </h2>
        </div>
        <div className="flex border-b">
          <button
            onClick={() => setView('find-id')}
            className={`flex-1 py-2 text-sm font-medium ${view === 'find-id' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>
            아이디 찾기
          </button>
          <button
            onClick={() => setView('find-password')}
            className={`flex-1 py-2 text-sm font-medium ${view === 'find-password' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>
            비밀번호 찾기
          </button>
        </div>

        {view === 'find-id' ? (
          <form className="mt-8 space-y-6" onSubmit={handleFindId}>
            <p className="text-center text-sm text-gray-600">가입 시 사용한 이메일을 입력하시면 아이디를 알려드립니다.</p>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">이메일 주소</label>
                <input id="email-address" name="email" type="email" required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="이메일 주소" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            {message && <p className="text-red-500 text-sm text-center">{message}</p>}
            <div>
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">아이디 찾기</button>
            </div>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleFindPassword}>
            <p className="text-center text-sm text-gray-600">아이디와 이메일을 입력하여 계정을 확인합니다.</p>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="id" className="sr-only">아이디</label>
                <input id="id" name="id" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="아이디" value={id} onChange={(e) => setId(e.target.value)} />
              </div>
              <div>
                <label htmlFor="email-address-pw" className="sr-only">이메일 주소</label>
                <input id="email-address-pw" name="email-pw" type="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="이메일 주소" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            {message && <p className="text-red-500 text-sm text-center">{message}</p>}
            <div>
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">비밀번호 재설정</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}