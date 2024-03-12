'use client'

import React, { useEffect } from 'react'
import { MdHttps, MdMail } from "react-icons/md";
import { useFormState } from 'react-dom'
import { authenticate, createUser } from '@/app/lib/actions'
import SubmitButton from './submit-button';
import { toast } from 'sonner';

export default function AuthForm({ isRegister }: { isRegister: boolean }) {
  const [errorMessage, dispatch] = useFormState(isRegister ? createUser : authenticate, undefined)
  
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
    }
  }, [errorMessage])

  return (
    <form className="w-full" action={dispatch}>
      <label className="flex items-center gap-2 p-3 border border-[#BDBDBD] rounded-lg">
        <MdMail color="#828282" size={24}/>
        <input  name="email" className="placeholder:text-[#828282] w-full rounded-lg focus-visible:outline-none bg-transparent" placeholder="Email" required type="email"/>
      </label>
      <label className="flex mt-3 items-center gap-2 p-3 border border-[#BDBDBD] rounded-lg">
        <MdHttps color="#828282" size={24}/>
        <input name="password" className="placeholder:text-[#828282] w-full focus-visible:outline-none bg-transparent" placeholder="Password" required type="password"/>
      </label>
      <SubmitButton isRegister={isRegister}/>
    </form>
  )
}
