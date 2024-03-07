'use client'

import { logOut } from '@/app/lib/actions'
import { UserType } from '@/app/lib/definitions'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { MdAccountCircle, MdArrowDropDown, MdExitToApp, MdPeople } from 'react-icons/md'

export default function Header({ user }: { user: UserType | null }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogOut = async () => {
    await signOut()
    await logOut()
  }
  return (
    <header className='flex justify-between p-7'>
      <div className="bg-[url('/devchallenges.svg')] dark:bg-[url('/devchallenges-light.svg')] bg-no-repeat min-h-[20px] w-[140px]"></div>
      <div  className='w-fit relative'>
        <div onClick={() => setMenuOpen(prev => !prev)}className='flex gap-3 items-center cursor-pointer'>
          <Image src={user?.photo || ''} width={32} height={32} className='rounded-lg' alt="Profile" />
          <p className='font-bold text-xs text-nowrap'>{user?.name}</p>
          <MdArrowDropDown className={`${menuOpen ? 'rotate-180' : ''} transition-all`} size={24} />
        </div>
        {menuOpen && ( 
          <div className='flex shadow-[0px_2px_4px_0px_#0000000D] flex-col border dark:border-zinc-600 rounded-lg *:rounded-lg bg-white dark:bg-[#211f25] *:py-2 *:transition-colors
          *:flex *:items-center *:gap-3 *:pl-3 *:pr-10 p-3 *:text-nowrap gap-2 absolute top-12 right-0 *:text-xs *:font-medium dark:hover:*:bg-[#2c2a32] hover:*:bg-[#E0E0E0]'>
            <Link href='/' className=' hover:bg-[#E0E0E0]'><MdAccountCircle size={20}/> My Profile</Link>
            <Link href='/'><MdPeople size={20}/> Group Chat</Link>
            <div id='separator' className='dark:bg-zinc-600 bg-[#E0E0E0]'></div>
            <button onClick={handleLogOut} className='text-[#EB5757]'><MdExitToApp size={20}/> Logout</button>
          </div>
        )}
      </div>
    </header>
  )
}
