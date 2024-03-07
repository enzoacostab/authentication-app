'use client'

import { uploadImage } from '@/app/lib/actions'
import { UserType } from '@/app/lib/definitions'
import Image from 'next/image'
import React, { useState, useTransition } from 'react'
import { LuLoader2 } from 'react-icons/lu'
import { MdPhotoCamera } from 'react-icons/md'

export default function ChangePhoto({ user }: { user: UserType }) {
  const [pending, startTransition] = useTransition();
  const [image, setImage] = useState<string | undefined>()

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
    <div className='flex items-center gap-7'>
      <div className='relative'>
        <label className='bg-[#00000033] cursor-pointer flex items-center justify-center rounded-lg absolute size-full'>
          {pending ? (
            <LuLoader2 size={24} className='animate-spin'/>
          ) : (
            <MdPhotoCamera size={24} />
          )}
          <input disabled={pending} onChange={handleChange} type="file" className='hidden' accept='image/*'/>
          <input type="hidden" name='photo' value={image || user?.photo}/>
        </label>
        <Image src={image || user?.photo || ''} width={72} height={72} className='rounded-lg' alt="Profile"/>
      </div>
      <span className='text-[#828282] text-sm font-medium'>CHANGE PHOTO</span>
    </div>
  )
}
