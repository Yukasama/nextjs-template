import { logout } from '@/actions/auth/logout'
import { signOut } from '@/lib/auth'

jest.mock('@/lib/auth', () => ({
  signOut: jest.fn(),
}))

describe('logout', () => {
  it('should call signOut', async () => {
    await logout()
    expect(signOut).toHaveBeenCalledTimes(1)
  })
})
