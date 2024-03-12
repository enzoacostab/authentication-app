import { signIn } from '@/auth';
import Image from 'next/image';
import React from 'react'

export default function LoginProviders() {
  
  return (
    <div className="flex disabled:*:bg-[rgb(var(--background-rgb))] *:h-[42px] justify-between w-full *:transition-colors *:rounded-full hover:*:bg-[rgb(var(--foreground-rgb))]">
      <form action={async () => {
        'use server'
        await signIn('google')
      }}>
        <button>
          <Image src="/Google.svg" width={42} height={42} alt="google icon"></Image>
        </button>
      </form>
      <form action={async () => {
        'use server'
        await signIn('facebook')
      }}>
        <button>
          <Image src="/Facebook.svg" width={42} height={42} alt="facebook icon"></Image>
        </button>
      </form>
      <form action={async () => {
        'use server'
        await signIn('twitter')
      }}>
        <button>
          <Image src="/Twitter.svg" width={42} height={42} alt="twitter icon"></Image>
        </button>
      </form>
      <form action={async () => {
        'use server'
        await signIn('github')
      }}>
        <button>
          <Image src="/Github.svg" width={42} height={42} alt="github icon"></Image>
        </button>
      </form>
    </div>
  )
}
