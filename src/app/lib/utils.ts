import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

export const getTokenData = () => {
  const token = cookies().get('token')?.value
  if (!token) return null;
  const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!)
  return decodedToken.id
}

export const type = (attribute: string) => {
  switch (attribute) {
    case "email": return "email"
    case "phone": return "tel"
    case "password": return "password"
    default: return "text"
  }
}