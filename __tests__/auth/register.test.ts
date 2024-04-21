import { register } from '../../src/actions/register' // Adjust the import path as necessary
import { db } from '@/lib/db'
import { saltAndHashPassword } from '@/utils/password'
import { generateVerificationToken } from '../../src/lib/token'
import { sendVerificationEmail } from '@/lib/mail'

// Mocking the necessary utilities and DB calls
jest.mock('@/lib/db', () => ({
  user: {
    count: jest.fn(),
    create: jest.fn(),
  },
}))
jest.mock('@/utils/password', () => ({
  saltAndHashPassword: jest.fn(),
}))
jest.mock('@/lib/token', () => ({
  generateVerificationToken: jest.fn(),
}))
jest.mock('@/lib/mail', () => ({
  sendVerificationEmail: jest.fn(),
}))

describe('register function', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should reject registration if the email is already registered', async () => {
    db.user.count.mockResolvedValue(1) // Simulates finding an existing user
    const result = await register({
      values: { email: 'test@example.com', password: 'password123' },
    })
    expect(result).toEqual({ error: 'Email is already registered.' })
    expect(db.user.count).toHaveBeenCalledWith({
      where: { email: 'test@example.com' },
    })
  })

  it('should handle registration for a new user', async () => {
    db.user.count.mockResolvedValue(0) // No existing user
    saltAndHashPassword.mockResolvedValue('hashed_password')
    generateVerificationToken.mockResolvedValue({ token: 'verification_token' })
    const result = await register({
      values: { email: 'test@example.com', password: 'password123' },
    })

    expect(db.user.create).toHaveBeenCalled()
    expect(sendVerificationEmail).toHaveBeenCalledWith({
      email: 'test@example.com',
      token: 'verification_token',
    })
    expect(result).toEqual({ success: 'Confirmation email sent!' })
  })

  // Additional tests for error handling, invalid inputs, etc. can be included here
})
