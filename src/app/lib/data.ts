import { auth } from "@/auth"
import { UserType } from "./definitions"

export const getUser = async () => {
  const session = await auth()
  const user: UserType | undefined = session?.user as UserType
  return user
}

export const attributes = ['photo', 'name', 'bio', 'phone', 'email']
