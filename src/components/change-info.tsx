import { updateInfo } from '@/app/lib/actions'
import Link from 'next/link'
import React from 'react'
import { MdArrowBackIos } from 'react-icons/md'
import ChangePhoto from './change-photo'
import { UserType } from '@/app/lib/definitions'
import { type } from '@/app/lib/utils'

export default function ChangeInfo({ 
  attributes, 
  user 
}: { 
  attributes: string[],
  user: UserType
}) {

  return (
    <>
      <div className='max-w-[850px] w-full mb-3 px-5 lg:px-0'>
        <Link className='transition-colors flex items-center w-fit hover:text-sky-600 text-[#2D9CDB]' href={'/'}><MdArrowBackIos/>Back</Link>
      </div>
      <section className='max-w-[850px] w-full lg:border border-[#E0E0E0] rounded-xl px-7 py-7'>
        <div className='flex justify-between items-center lg:pb-9'>
          <div>
            <h2 className='text-2xl'>Change Info</h2>
            <p className='text-[#828282] w-[80%] sm:w-full mt-2 text-xs font-medium'>Changes will be reflected to every services</p>
          </div>
        </div>
        <form className='max-w-[420px]' action={updateInfo}>
          {attributes.map((attribute: string) => 
            <div key={attribute} className='mt-7'>
              {attribute === 'photo' ? (
                <ChangePhoto user={user}/>
              ) : (
                <label className='text-sm capitalize'>
                  {attribute}
                  {attribute === "bio" ? (
                    <textarea name={attribute} defaultValue={user[attribute] || ''} className='block mt-1 resize-none w-full bg-transparent border-[#828282] border rounded-xl p-4' rows={4} placeholder='Enter your bio...'></textarea>
                  ) : (
                    <input type={type(attribute)} defaultValue={attribute === 'password' ? '' : user[attribute] || ''} name={attribute} required={attribute === 'email' ? true : false} pattern={attribute === 'phone' ? "[0-9]{10}" : undefined} placeholder={`Enter your ${attribute}...`} className='border mt-1 p-4 bg-transparent border-[#828282] w-full rounded-xl'/>
                  )}
                </label>
              )}
            </div>
          )} 
          <button type='submit' className='px-6 py-2 mt-7 bg-[#2F80ED] transition-opacity hover:opacity-90 rounded-lg font-medium'>Save</button>
        </form>
      </section>
    </>
  )
}
