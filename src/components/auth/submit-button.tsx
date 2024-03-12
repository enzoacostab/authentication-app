import React from 'react'
import { useFormStatus } from 'react-dom'
import { LuLoader2 } from 'react-icons/lu'

export default function SubmitButton({ isRegister }: { isRegister: boolean }) {
  const { pending } = useFormStatus()

  return (
    <button disabled={pending} type="submit" className="font-semibold mt-5 bg-[#2F80ED] hover:opacity-90 disabled:opacity-90 transition-opacity p-2 w-full rounded-lg">
      {pending 
        ? <LuLoader2 size={24} className='animate-spin mx-auto'/>
        : isRegister ? 'Start coding now' : 'Login'}
    </button>
  )
}