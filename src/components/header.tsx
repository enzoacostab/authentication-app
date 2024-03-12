'use client'

import { UserType } from '@/app/lib/definitions'
import Image from 'next/image'
import React, { ReactNode, useState } from 'react'
import { MdArrowDropDown } from 'react-icons/md'

export default function Header({ user, children }: { user: UserType, children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className='flex justify-between p-7'>
      <div className="bg-[url('/devchallenges.svg')] dark:bg-[url('/devchallenges-light.svg')] bg-no-repeat min-h-[20px] w-[140px]"></div>
      <div  className='w-fit relative'>
        <div onClick={() => setMenuOpen(prev => !prev)}className='flex gap-3 items-center cursor-pointer'>
          <Image src={user?.photo || ''} width={32} height={32} className='rounded-lg' alt="Profile" />
          <p className='font-bold text-xs text-nowrap'>{user?.name}</p>
          <MdArrowDropDown className={`${menuOpen ? 'rotate-180' : ''} transition-all`} size={24} />
        </div>
        {menuOpen && children}
      </div>
    </header>
  )
}
