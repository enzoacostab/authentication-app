import User from "@/models/user";
import { getTokenData } from "./utils";
import { unstable_noStore as noStore } from "next/cache";
import { UserType } from "./definitions";

export const getUserData = async () => {
  noStore()
  const id: string = getTokenData()

  try {
    const user: UserType | null = await User.findById(id)
    return user
  } catch (error: any) {
    console.error(error.message);
  }
} 