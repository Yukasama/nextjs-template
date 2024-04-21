import bcrypt from 'bcryptjs'

export const saltAndHashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10)
}
