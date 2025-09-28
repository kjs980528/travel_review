'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailLocalPart, setEmailLocalPart] = useState('');
  const [emailDomain, setEmailDomain] = useState('');
  const [emailDomainOption, setEmailDomainOption] = useState('직접 입력');
  const [contact, setContact] = useState('');
  const [idMessage, setIdMessage] = useState('');
  const [isIdAvailable, setIsIdAvailable] = useState(false);
  const router = useRouter();

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
    setIsIdAvailable(false); // Reset availability on change
    setIdMessage('');
  };

  const handleIdCheck = async () => {
    if (!id) {
      setIdMessage('아이디를 입력해주세요.');
      return;
    }
    const response = await fetch('/api/auth/check-id', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    setIdMessage(data.message);
    setIsIdAvailable(data.isAvailable);
  };

  const handleEmailDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    setEmailDomainOption(selectedOption);
    if (selectedOption === '직접 입력') {
      setEmailDomain('');
    } else if (selectedOption === '네이버') {
      setEmailDomain('naver.com');
    } else if (selectedOption === '다음') {
      setEmailDomain('daum.net');
    } else if (selectedOption === '구글') {
      setEmailDomain('google.com');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isIdAvailable) {
      alert('아이디 중복 확인을 해주세요.');
      return;
    }
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const fullEmail = `${emailLocalPart}@${emailDomain}`;
    setEmail(fullEmail);

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, password, email: fullEmail, contact }),
    });

    if (response.ok) {
      alert('회원가입에 성공했습니다!');
      router.push('/login');
    } else {
      const data = await response.json();
      alert(data.message || '알 수 없는 오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center bg-[#ffffff] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg"> {/* Added bg-white, p-8, rounded-lg, shadow-lg */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            회원가입
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4"> {/* Changed from -space-y-px to space-y-4 */}
            <div>
              <label htmlFor="id" className="sr-only">
                아이디
              </label>
              <div className="flex items-center space-x-2"> {/* Added space-x-2 for button spacing */}
                <input
                  id="id"
                  name="id"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" // Changed rounded-t-md to rounded-md, removed rounded-none
                  placeholder="아이디"
                  value={id}
                  onChange={handleIdChange}
                />
                <button
                  type="button"
                  onClick={handleIdCheck}
                  className="flex-shrink-0 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700" // Adjusted px, removed ml-2, added flex-shrink-0
                >
                  중복 확인
                </button>
              </div>
              {idMessage && (
                <p className={`mt-2 text-sm ${isIdAvailable ? 'text-green-600' : 'text-red-600'}`}>
                  {idMessage}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" // Added rounded-md, removed rounded-none
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                비밀번호 확인
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" // Added rounded-md, removed rounded-none
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email-local-part" className="sr-only">
                이메일
              </label>
              <div className="flex items-center space-x-2">
                <input
                  id="email-local-part"
                  name="email-local-part"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="이메일"
                  value={emailLocalPart}
                  onChange={(e) => setEmailLocalPart(e.target.value)}
                />
                <span>@</span>
                <input
                  id="email-domain"
                  name="email-domain"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="도메인"
                  value={emailDomain}
                  onChange={(e) => setEmailDomain(e.target.value)}
                  disabled={emailDomainOption !== '직접 입력'}
                />
                <select
                  id="email-domain-select"
                  value={emailDomainOption}
                  onChange={handleEmailDomainChange}
                  className="appearance-none relative block px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="직접 입력">직접 입력</option>
                  <option value="네이버">naver.com</option>
                  <option value="다음">daum.net</option>
                  <option value="구글">google.com</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="contact" className="sr-only">
                연락처
              </label>
              <input
                id="contact"
                name="contact"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" // Added rounded-md, removed rounded-none, removed rounded-b-md
                placeholder="연락처"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={!isIdAvailable}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
