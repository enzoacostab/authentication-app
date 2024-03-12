'use client'

import { updateInfo } from '@/app/lib/actions'
import { attributes } from '@/app/lib/data'
import { useFormState, useFormStatus } from 'react-dom'
import { type } from '@/app/lib/utils'
import { toast } from 'sonner'
import { uploadImage } from '@/app/lib/actions'
import { UserType } from '@/app/lib/definitions'
import Image from 'next/image'
import React, { useEffect, useState, useTransition } from 'react'
import { LuLoader2 } from 'react-icons/lu'
import { MdPhotoCamera } from 'react-icons/md'

export default function ChangeInfoForm({ user }: { user?: UserType }) {
  const [errorMessage, dispatch] = useFormState(updateInfo, undefined)
  const [imagePending, startTransition] = useTransition();
  const [image, setImage] = useState<string | undefined>(user?.photo)

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
    }
  }, [errorMessage])

  const handleChange = ({ target }: {target: HTMLInputElement}) => {
    const file = target?.files?.[0]
    if (!file) return;

    let form = new FormData();
    form.append("fileUpload", file);
    
    startTransition(async () => {
      const newImage = await uploadImage(form)
      setImage(newImage)
    })
  };


  return (
    <form className='max-w-[420px]' action={dispatch}>
      {attributes.map((attribute: string) => 
        <div key={attribute} className='mt-7'>
          {attribute === 'photo' ? (
            <div className='flex items-center gap-7'>
              <div className='relative'>
                <label className='bg-[#00000033] cursor-pointer flex items-center justify-center rounded-lg absolute size-full'>
                  {imagePending ? (
                    <LuLoader2 size={24} className='animate-spin'/>
                  ) : (
                    <MdPhotoCamera size={24} />
                  )}
                  <input disabled={imagePending} onChange={handleChange} type="file" className='hidden' accept='image/*'/>
                  <input type="hidden" name='photo' value={image || user?.photo}/>
                </label>
                <Image src={image || ''} width={72} height={72} className='rounded-lg' alt="Profile"/>
              </div>
              <span className='text-[#828282] text-sm font-medium'>CHANGE PHOTO</span>
            </div>
          ) : (
            <label className='text-sm capitalize'>
              {attribute}
              {attribute === "bio" ? (
                <textarea 
                  name={attribute} 
                  defaultValue={user?.[attribute] || ''} 
                  className='block mt-1 resize-none w-full bg-transparent border-[#828282] border rounded-xl p-4' 
                  rows={4} 
                  placeholder='Enter your bio...'
                />
              ) : (
                <input 
                  type={type(attribute)} 
                  defaultValue={attribute === 'password' ? '' : user?.[attribute] || ''} 
                  name={attribute} 
                  required={attribute === 'email' ? true : false} 
                  pattern={attribute === 'phone' ? "[0-9]{10}" : undefined} 
                  placeholder={`Enter your ${attribute}...`} 
                  className='border mt-1 p-4 bg-transparent border-[#828282] w-full rounded-xl'
                />
              )}
            </label>
          )}
        </div>
      )} 
      <SubmitButton imagePending={imagePending}/>
    </form>
  )
}

function SubmitButton({ imagePending }: { imagePending: boolean }) {
  const { pending } = useFormStatus()
  return (
    <button disabled={pending || imagePending} className='px-6 py-2 mt-7 bg-[#2F80ED] transition-opacity hover:opacity-90 disabled:opacity-90 rounded-lg font-medium'>
      Save
    </button>
  )
}
