export const type = (attribute: string) => {
  switch (attribute) {
    case "email": return "email"
    case "phone": return "tel"
    case "password": return "password"
    default: return "text"
  }
}