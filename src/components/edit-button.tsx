'use client'

import React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function EditButton() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const path = usePathname()

  const handleEdit = () => {
    const params = new URLSearchParams(searchParams)
    params.set('edit', 'true')
    router.push(`${path}?${params.toString()}`)
  }

  return (
    <button onClick={handleEdit} className='border border-[#828282] hover:border-current hover:text-current transition-colors h-fit py-2 px-8 text-lg text-[#828282] rounded-xl'>
      Edit
    </button>
  )
}
