'use server'

import { getUser } from '@/lib/auth'
import { db } from '@/lib/db'
import { logger } from '@/lib/logger'
import { UserUpdateProps, UserUpdateSchema } from '@/lib/validators/user'

export const updateUser = async ({ values }: { values: UserUpdateProps }) => {
  const validatedFields = UserUpdateSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: 'Invalid fields.' }
  }

  const { name } = validatedFields.data
  logger.info('updateUser (attempt): name=%s', name)

  const user = await getUser()
  await db.user.update({
    where: { id: user?.id },
    data: {
      ...(name && { name }),
    },
  })

  logger.info('updateUser (success): name=%s', name)
}
