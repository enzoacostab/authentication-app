export interface UserType {
  name?: string
  email: string
  photo?: string
  bio?: string
  phone?: string
  password: string | null
  [attribute: string]: string | null | undefined
}
