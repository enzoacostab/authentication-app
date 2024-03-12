import React from 'react'
import LoginProviders from './login-providers'
import Link from 'next/link'
import AuthForm from './auth-form'

export default async function AuthPage({ form }: { form: string }) {
  const isRegister = form === 'register'

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="py-10 px-16 max-w-[500px] w-full my-auto gap-5 items-center flex flex-col border rounded-3xl border-[#BDBDBD]">
        <div className="bg-[url('/devchallenges.svg')] dark:bg-[url('/devchallenges-light.svg')] bg-no-repeat min-h-[20px] w-full"></div>
        <h1 className="text-lg font-semibold w-full">{isRegister ? 'Join thousands of learners from around the world' : 'Login'}</h1>
        {isRegister ? (
          <p className="mb-3">Master web development by making real-life projects. There are multiple paths for you to choose</p>
        ) : null}
        <AuthForm isRegister={isRegister}/>
        <section className="flex flex-col w-fit items-center mt-3 gap-5">
          <p className="text-sm text-[#828282]">or continue with these social profile</p>
          <LoginProviders/>
          {isRegister ? (
            <p className="text-[#828282] text-sm">
              Adready a member?
              <Link href="/login" className="text-[#2d98d6] ml-1">Login</Link>
            </p>
          ) : (
            <p className="text-[#828282] text-sm">
              Don’t have an account yet? 
              <Link href='/register' className="text-[#2d98d6] ml-1">Register</Link>
            </p>
          )}
        </section>
      </div>
    </main>
  )
}
