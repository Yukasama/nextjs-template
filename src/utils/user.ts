import { db } from '@/lib/db'

export const getUserByEmail = async ({ email }: { email: string }) => {
  return await db.user.findUnique({ where: { email } })
}

export const getUserById = async ({ id }: { id?: string }) => {
  return await db.user.findUnique({ where: { id } })
}
