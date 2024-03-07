'use server'

import cloudinary from 'cloudinary'
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { connectDb } from './db';
import User from '@/models/user';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { UserType } from './definitions';
import { getTokenData } from './utils';
import { Session } from 'next-auth';

cloudinary.v2.config({
  cloud_name: 'dpmlgj0rm',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const FormSchema = z.object({
  photo: z.string().url().optional(),
  name: z.string().optional(),
  bio: z.string().optional(),
  phone: z.string().length(10).optional(),
  email: z.string().email('Invalid Email'),
  password: z.string().min(6).optional()
})

export const updateInfo = async (formData: FormData) => {
  connectDb()

  const formDataObject = Object.fromEntries(
    Object.entries(
      Object.fromEntries(formData)
    ).filter(e => e[1] != '')
  )

  const validatedFields = FormSchema.safeParse(formDataObject)

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    
    return 'Missing fields. Failed to update user'
  }

  const { data } = validatedFields
  const verifyEmail = await User.findOne({ email: data.email })
  const userId = getTokenData()

  if (verifyEmail && verifyEmail.id != userId) {
    return 'Email already in use'
  }

  try {
    await User.findByIdAndUpdate(userId, data)
  } catch (error: any) {
    return 'Database error. Failed to update user'
  }

  revalidatePath('/')
  redirect('/')
}

export const uploadImage = async (formData: FormData) => {
  const file = formData.get('fileUpload') as File
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const response: string | undefined = await new Promise((resolve) => {
    cloudinary.v2.uploader.upload_stream((err, result) => {
      return resolve(result?.secure_url)
    }).end(buffer)
  })
  
  revalidatePath('/')
  return response
}

const CreateUser = FormSchema.pick({ email: true, password: true, photo: true, name: true })

export const createUser = async (prevState: string | undefined, formData: FormData) => {
  connectDb()
  
  const validatedFields = CreateUser.safeParse(Object.fromEntries(formData))
  
  if (!validatedFields.success) {
    return 'Missing fields. Failed to create user'
  }

  const { data } = validatedFields
  const alreadyExists = await User.findOne({ email: data.email })
  
  if (alreadyExists) {
    return 'There is already a user with that email'
  }

  const newUser: UserType = { ...data, password: null }
  
  if (data.password){
    const passwordHash = await bcrypt.hash(data.password!, 10)
    newUser.password = passwordHash
  } 
  
  try {
    await User.create(newUser)
  } catch (error: any) {
    return 'Database error. Failed to create user';
  }

  redirect('/login')
}

const LogIn = FormSchema.pick({ email: true, password: true })

export const logIn = async (prevState: string | undefined, formData: FormData) => {
  connectDb()

  const validatedFields = LogIn.safeParse(Object.fromEntries(formData))
  
  if (!validatedFields.success) {
    return 'Invalid credentials'
  }
  
  const { data } = validatedFields
  const user = await User.findOne({ email: data.email })
  let validPassword = true

  if (data.password) {
    validPassword = await bcrypt.compare(data.password!, user.password)
  }
  
  if (!validPassword || !user) {
    return 'Invalid credentials'
  }
  
  const tokenData = {
    id: user.id,
  }

  const token = await jwt.sign(tokenData, process.env.JWT_SECRET!)
  cookies().set("token", token, { httpOnly: true })
  redirect('/')
}

export const logInWithProvider = async (session: Session) => {
  connectDb()
  
  const { email, image, name }: any = session.user
  const formData = new FormData()
  formData.append('email', email)

  const user = await User.findOne({ email })

  if (user) {
    await logIn(undefined, formData)
    return
  }

  formData.append('name', name)
  formData.append('photo', image)
  const createUserResponse = await createUser(undefined, formData)

  if (createUserResponse) {
    return createUserResponse
  }

  formData.delete('name')
  formData.delete('photo')
  const logInResponse = await logIn(undefined, formData)
  return logInResponse
}

export const logOut = async () => {
  cookies().set('token', '', { httpOnly: true, expires: new Date(0) })
}

