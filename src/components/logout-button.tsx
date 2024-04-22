'use client'

import { Button } from './ui/button'
import { logout } from '@/actions/logout'

export const LogoutButton = () => {
  return <Button onClick={() => logout()}>Sign Out</Button>
}
