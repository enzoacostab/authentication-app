import Image from 'next/image'
import React from 'react'
import EditButton from './edit-button'
import { UserType } from '@/app/lib/definitions'
import { attributes } from '@/app/lib/data'

export default function PersonalInfo({ user }: { user?: UserType }) {
  return (
    <>
      <h1 className='text-2xl lg:text-4xl mx-auto'>Personal info</h1>
      <p className='text-sm lg:text-lg font-light mx-auto mt-2 lg:mb-10'>Basic info, like your name and photo</p>
      <section className='max-w-[850px] w-full lg:border border-[#E0E0E0] rounded-xl'>
        <div className='flex justify-between items-center lg:pb-9 pt-9 px-7 lg:border-b border-b-[#D3D3D3]'>
          <div>
            <h2 className='text-2xl'>Profile</h2>
            <p className='text-[#828282] w-[80%] sm:w-full mt-2 text-xs font-medium'>Some info may be visible to other people</p>
          </div>
          <EditButton/>
        </div>
        <ul>
          {attributes.map((attribute: string) => 
            <li key={attribute} className={`py-9 flex px-7 justify-between lg:justify-start items-center ${attributes.at(-1) !== attribute ? 'border-b border-b-[#E0E0E0]' : ''}`}>
              <h3 className='uppercase text-[#BDBDBD] w-[30%] min-w-[100px] text-sm font-medium'>{attribute}</h3>
              {attribute === 'photo' 
                ? <Image src={user?.[attribute] || ''} width={72} height={72} className='rounded-lg' alt="Profile" />
                : <p className='text-base font-medium'>{attribute === 'password' ? '● '.repeat(10) : user?.[attribute]}</p>}
            </li>
          )}
        </ul>
      </section>
    </>
  )
}
