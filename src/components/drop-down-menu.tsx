import React from 'react'
import Link from 'next/link'
import { MdAccountCircle, MdPeople } from 'react-icons/md'
import Logout from './logout'

export default function DropDownMenu() {
  return (
    <div className='flex shadow-[0px_2px_4px_0px_#0000000D] flex-col border dark:border-zinc-600 rounded-lg *:rounded-lg bg-white dark:bg-[#211f25] *:py-2 *:transition-colors
    *:flex *:items-center *:gap-3 *:pl-3 *:pr-10 p-3 *:text-nowrap gap-2 absolute top-12 right-0 *:text-xs *:font-medium dark:hover:*:bg-[#2c2a32] hover:*:bg-[#E0E0E0]'>
      <Link href='/' className=' hover:bg-[#E0E0E0]'><MdAccountCircle size={20}/> My Profile</Link>
      <Link href='/'><MdPeople size={20}/> Group Chat</Link>
      <div id='separator' className='dark:bg-zinc-600 bg-[#E0E0E0]'></div>
      <Logout/>
    </div>
  )
}
