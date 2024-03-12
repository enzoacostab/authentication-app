import Link from 'next/link'
import React from 'react'
import { MdArrowBackIos } from 'react-icons/md'
import { UserType } from '@/app/lib/definitions'
import ChangeInfoForm from './change-info-form'

export default function ChangeInfo({ user }: { user?: UserType}) {
  return (
    <>
      <div className='max-w-[850px] w-full mb-3 px-5 lg:px-0'>
        <Link className='transition-colors flex items-center w-fit hover:text-sky-600 text-[#2D9CDB]' href={'/'}>
          <MdArrowBackIos/>
          Back
        </Link>
      </div>
      <section className='max-w-[850px] w-full lg:border border-[#E0E0E0] rounded-xl px-7 py-7'>
        <div className='flex justify-between items-center lg:pb-9'>
          <div>
            <h2 className='text-2xl'>Change Info</h2>
            <p className='text-[#828282] w-[80%] sm:w-full mt-2 text-xs font-medium'>Changes will be reflected to every services</p>
          </div>
        </div>
        <ChangeInfoForm user={user}/>
      </section>
    </>
  )
}
