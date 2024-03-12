import { signOut } from '@/auth'
import React from 'react'
import { MdExitToApp } from 'react-icons/md'

export default function Logout() {
  return (
    <form className='text-[#EB5757]' action={async () => {
      'use server'
      await signOut()
    }}>
      <MdExitToApp size={20}/>
      <button>Logout</button>
    </form>
  )
}
