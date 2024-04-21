import { db } from '@/lib/db'

/**
 * Find User by email
 * @param email Email of the user
 * @returns User object with email
 */
export const getUserByEmail = async ({ email }: { email: string }) => {
  return await db.user.findUnique({ where: { email } })
}

/**
 * Find User by id
 * @param id Id of the user
 * @returns User object with id
 */
export const getUserById = async ({ id }: { id?: string }) => {
  return await db.user.findUnique({ where: { id } })
}

/**
 * Find user by email and password
 * @param email Email of the user
 * @param password Password of the user
 * @returns User object
 */
export const getUserFromDb = async ({
  email,
  pwHash,
}: {
  email: string
  pwHash: string
}) => {
  return await db.user.findFirst({
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      image: true,
    },
    where: {
      email,
      hashedPassword: pwHash,
    },
  })
}
