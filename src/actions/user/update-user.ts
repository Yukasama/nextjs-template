'use server'

import { getUser } from '@/lib/auth'
import { db } from '@/lib/db'
import { logger } from '@/lib/logger'
import { UserUpdateProps, UserUpdateSchema } from '@/lib/validators/user'

/**
 * Update user information.
 * @param values `UserUpdateSchema` validator
 * @returns Success or error JSON object
 */
export const updateUser = async (values: UserUpdateProps) => {
  const validatedFields = UserUpdateSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: 'Invalid fields.' }
  }

  const { name } = validatedFields.data

  const user = await getUser()
  logger.info('updateUser (attempt): email=%s', user?.email)

  await db.user.update({
    where: { id: user?.id },
    data: {
      ...(name && { name }),
    },
  })

  logger.info('updateUser (success): name=%s', name)

  return { success: 'User updated successfully.' }
}
