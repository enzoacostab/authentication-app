'use client'

import { logInWithProvider } from '@/app/lib/actions';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useTransition } from 'react'
import { toast } from 'sonner';

export default function LoginProviders() {
  const { data: session } = useSession()
  const [pending, startTransition] = useTransition()

  useEffect(() => { 
    if (session) {
      startTransition(() => {
        const login = async () => {
          const res = await logInWithProvider(session)
          if (res) {
            toast.error(res)
          } else {
            toast.success('Logged in successfully', {duration: 5000})
          }
        }

        login()
      })
    }
  }, [session])
  
  return (
    <div className="flex disabled:*:bg-[rgb(var(--background-rgb))] justify-between w-full *:transition-colors *:rounded-full hover:*:bg-[rgb(var(--foreground-rgb))]">
      <button disabled={pending} onClick={async () => await signIn('google')}>
        <Image src="/Google.svg" width={42} height={42} alt="google icon"></Image>
      </button>
      <button disabled={pending} onClick={async () => await signIn('facebook')}>
        <Image src="/Facebook.svg" width={42} height={42} alt="google icon"></Image>
      </button>
      <button disabled={pending} onClick={async () => await signIn('twitter')}>
        <Image src="/Twitter.svg" width={42} height={42} alt="google icon"></Image>
      </button>
      <button disabled={pending} onClick={async () => await signIn('github')}>
        <Image src="/Github.svg" width={42} height={42} alt="google icon"></Image>
      </button>
    </div>
  )
}
