/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-20 00:45:58
 * @LastEditTime: 2023-05-22 22:58:18
 * @FilePath: /guangqi/client/src/components/Auth/ResetPassword.tsx
 * @Description:
 *
 * ResetPassword组件
 *
 * 版权所有 © 2023 Ethan Zhang，保留所有权利。
 */
/* eslint @typescript-eslint/ban-ts-comment: "off" */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useResetPasswordMutation, TResetPassword } from '../../data-provider';
import { useRouter } from 'next/router';

function ResetPassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<TResetPassword>();
  const resetPassword = useResetPasswordMutation();
  const [resetError, setResetError] = useState<boolean>(false);
  // const [params] = useSearchParams();
  const router = useRouter();
  const { query } = router;
  const password = watch('password');

  const onSubmit = (data: TResetPassword) => {
    // 从查询参数中获取令牌和用户ID，并将其添加到数据对象中
    resetPassword.mutate(data, {
      onError: () => {
        setResetError(true);
      }
    });
  };

  if (resetPassword.isSuccess) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white pt-6 sm:pt-0">
        <div className="mt-6 w-96 overflow-hidden bg-white px-6 py-4 sm:max-w-md sm:rounded-lg">
          <h1 className="mb-4 text-center text-3xl font-semibold">密码重置成功</h1>
          <div
            className="relative mb-8 mt-4 rounded border border-green-400 bg-green-100 px-4 py-3 text-center text-green-700"
            role="alert"
          >
            您现在可以使用新密码登录。
          </div>
          <button
            onClick={() => router.push('/login')}
            aria-label="Sign in"
            className="w-full transform rounded-sm bg-green-500 px-4 py-3 tracking-wide text-white transition-colors duration-200 hover:bg-green-600 focus:bg-green-600 focus:outline-none"
          >
            继续
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white pt-6 sm:pt-0">
        <div className="mt-6 w-96 overflow-hidden bg-white px-6 py-4 sm:max-w-md sm:rounded-lg">
          <h1 className="mb-4 text-center text-3xl font-semibold">重置您的密码</h1>
          {resetError && (
            <div
              className="relative mt-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
              role="alert"
            >
              此密码重置令牌已不再有效。{' '}
              <a className="font-semibold text-green-600 hover:underline" href="/forgot-password">
                点击这里
              </a>{' '}
              重试。
            </div>
          )}
          <form
            className="mt-6"
            aria-label="Password reset form"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-2">
              <div className="relative">
                <input
                  type="hidden"
                  id="token"
                  value={query.token}
                  {...register('token', { required: '无法处理：无有效的重置令牌' })}
                />
                <input
                  type="hidden"
                  id="userId"
                  value={query.userId}
                  {...register('userId', { required: '无法处理：无有效的用户ID' })}
                />
                <input
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  aria-label="密码"
                  {...register('password', {
                    required: '密码是必填项',
                    minLength: {
                      value: 8,
                      message: '密码至少为8个字符'
                    },
                    maxLength: {
                      value: 40,
                      message: '密码长度不能超过40个字符'
                    }
                  })}
                  aria-invalid={!!errors.password}
                  className="peer block w-full appearance-none rounded-t-md border-0 border-b-2 border-gray-300 bg-gray-50 px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-green-500 focus:outline-none focus:ring-0"
                  placeholder=" "
                ></input>
                <label
                  htmlFor="password"
                  className="absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-green-500"
                >
                  密码
                </label>
              </div>

              {errors.password && (
                <span role="alert" className="mt-1 text-sm text-red-600">
                  {/* @ts-ignore */}
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="mb-2">
              <div className="relative">
                <input
                  type="password"
                  id="confirm_password"
                  aria-label="确认密码"
                  // uncomment to prevent pasting in confirm field
                  onPaste={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                  {...register('confirm_password', {
                    validate: (value) => value === password || '密码不匹配'
                  })}
                  aria-invalid={!!errors.confirm_password}
                  className="peer block w-full appearance-none rounded-t-md border-0 border-b-2 border-gray-300 bg-gray-50 px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-green-500 focus:outline-none focus:ring-0"
                  placeholder=" "
                ></input>
                <label
                  htmlFor="confirm_password"
                  className="absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-green-500"
                >
                  确认密码
                </label>
              </div>
              {errors.confirm_password && (
                <span role="alert" className="mt-1 text-sm text-red-600">
                  {/* @ts-ignore */}
                  {errors.confirm_password.message}
                </span>
              )}
              {errors.token && (
                <span role="alert" className="mt-1 text-sm text-red-600">
                  {/* @ts-ignore */}
                  {errors.token.message}
                </span>
              )}
              {errors.userId && (
                <span role="alert" className="mt-1 text-sm text-red-600">
                  {/* @ts-ignore */}
                  {errors.userId.message}
                </span>
              )}
            </div>
            <div className="mt-6">
              <button
                disabled={!!errors.password || !!errors.confirm_password}
                type="submit"
                aria-label="提交注册"
                className="w-full transform rounded-sm bg-green-500 px-4 py-3 tracking-wide text-white transition-colors duration-200 hover:bg-green-600 focus:bg-green-600 focus:outline-none"
              >
                继续
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
