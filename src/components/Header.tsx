'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 bg-white shadow-sm z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-800">
              로고
            </Link>
          </div>

          {/* 검색창 */}
          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-center">
            <div className="max-w-lg w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">검색</label>
              <div className="relative">
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="여행지나 랜드마크 등을 검색해주세요"
                  type="search"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽 메뉴 */}
          <div className="flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="px-3 py-2 rounded-md text-sm font-medium text-gray-700">
                Loading...
              </div>
            ) : session ? (
              <>
                <Link href="/campaigns" className="px-3 py-2 rounded-md text-sm font-medium text-white bg-green-500 hover:bg-green-600">
                  체험단 신청
                </Link>
                <span className="text-sm font-medium text-gray-700">
                  {session.user?.name}님
                </span>
                <button
                  onClick={() => signOut()}
                  className="px-3 py-2 rounded-md text-sm font-medium text-white bg-black hover:bg-gray-800"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link href="/signup" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300">
                  회원가입
                </Link>
                <button
                  onClick={() => signIn()}
                  className="px-3 py-2 rounded-md text-sm font-medium text-white bg-black hover:bg-gray-800"
                >
                  로그인
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;