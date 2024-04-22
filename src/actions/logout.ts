'use server'

import { signOut } from '@/lib/auth'

/**
 * Sign out the user.
 */
export const logout = async () => {
  await signOut()
}
