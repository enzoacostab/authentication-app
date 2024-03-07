import React from 'react'
import Header from '@/components/header'
import PersonalInfo from '@/components/personal-info'
import ChangeInfo from '@/components/change-info'
import { getUserData } from './lib/data'

export default async function page({ searchParams }: { searchParams: { edit: string } }) {
  const { edit } = searchParams
  const user = await getUserData()
  const attributes = ['photo', 'name', 'bio', 'phone', 'email']
  if (user?.password) attributes.push('password')
  
  return (
    <>
      <Header user={JSON.parse(JSON.stringify(user))}/>
      <main className='flex justify-center items-center flex-col'>
        {edit ? (
          <ChangeInfo attributes={attributes} user={JSON.parse(JSON.stringify(user))}/>
        ) : (
          <PersonalInfo attributes={attributes} user={JSON.parse(JSON.stringify(user))}/>
        )}
      </main>
      <footer className='text-sm text-[#828282] flex justify-between max-w-[850px] px-5 pb-4 lg:px-0 mt-4 mx-auto'>
        <p>created by <span className='font-semibold'>enzoacostab</span></p>
        <p>devChallenges.io</p>
      </footer>
    </>
  )
}
