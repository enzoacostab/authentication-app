export interface UserType {
  id: string
  name?: string
  email: string
  photo?: string
  bio?: string
  phone?: string
  password: string
  [attribute: string]: string | undefined
}
