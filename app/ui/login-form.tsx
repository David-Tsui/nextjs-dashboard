'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  EyeIcon,
  ArrowUturnLeftIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { startTransition, useActionState, useState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
import SubmitButton from './submit-button';
import { validateCaptchaAction } from '@/app/lib/validate-recaptcha';
import { getCaptchaToken } from '@/app/lib/get-captcha-token';
import FlipCard from './flip-card';
import CopyButton from './btn-copy';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [errorMessage, formAction, pending] = useActionState(
    authenticate,
    undefined,
  );
  const [flipped, setFlipped] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const token = await getCaptchaToken()
    const formData = new FormData(form);
    const response = await validateCaptchaAction(token, formData);

    if (response.success) {
      startTransition(() => {
        formAction(formData);
      });
    }
  }

  return (
    <div className="relative">
      <FlipCard
        flipped={flipped}
        onFlipChange={setFlipped}
        front={(
          <form
            onSubmit={handleSubmit}
            className="space-y-3"
          >
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
              <h1 className={`${lusitana.className} mb-3 text-2xl`}>
                Please log in to continue.
              </h1>
              <div className="w-full">
                <div>
                  <label
                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <input
                      className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      required
                    />
                    <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
                </div>
                <div className="mt-4">
                  <label
                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      required
                      minLength={6}
                    />
                    <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
                </div>
              </div>
              <input type="hidden" name="redirectTo" value={callbackUrl} />
              <SubmitButton
                pending={pending}
                className="g-recaptcha mt-4 w-full"
              >
                Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
              </SubmitButton>
              <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
              >
                {errorMessage && (
                  <>
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                    <p className="text-sm text-red-500">{errorMessage}</p>
                  </>
                )}
              </div>
            </div>
          </form>
        )}
        back={(
          <div className="flex-1 rounded-lg bg-blue-50 px-6 pb-4 pt-8 flex flex-col items-center justify-center min-h-[350px]">
            <h2 className="mb-4 text-xl font-bold text-blue-700">Demo 帳號密碼</h2>
            <div className="mb-2 text-sm text-gray-700">
              <CopyButton text={"demo@example.com"}>
                帳號：<span className="font-mono">demo@example.com</span>
              </CopyButton>
            </div>
            <div className="mb-2 text-sm text-gray-700">
              <CopyButton text={"demo1234"}>
                密碼：<span className="font-mono">demo1234</span>
              </CopyButton>
            </div>
            <p className="mt-5 text-xs text-gray-500">
              使用以上帳號密碼登入，體驗系統功能。
            </p>
          </div>
        )}
      ></FlipCard>

      <button
        className="absolute z-10 bottom-2 right-2 flex items-center gap-1 w-18 px-2 py-1.5 rounded justify-center bg-blue-100 text-blue-700 text-xs shadow hover:bg-blue-200 transition cursor-pointer"
        onClick={() => setFlipped(flag => !flag)}
        aria-label="顯示測試帳號密碼"
      >
        {!flipped ? (
          <>
            <EyeIcon className="w-4 h-4" />
            Demo
          </>
        ) : (
          <>
            <ArrowUturnLeftIcon className="w-4 h-4" />
            返回
          </>
        )}
      </button>
    </div>
  );
}
