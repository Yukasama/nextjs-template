import { register } from '@/actions/auth/register'
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

describe('register', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const mockLogin = {
    email: 'test@example.com',
    password: 'password123',
  }

  const emailAlreadyExists = {
    email: 'daszehntefragezeichen@gmail.com',
    password: 'password123',
  }

  it('should handle registration for a new user', async () => {
    const result = await register(mockLogin)

    expect(sendVerificationEmail).toHaveBeenCalledWith({
      email: mockLogin.email,
      token: 'verification_token',
    })
    expect(result).toEqual({ success: 'Confirmation email sent.' })
  })

  it('should reject registration if the email is already registered', async () => {
    const result = await register(emailAlreadyExists)
    expect(result).toEqual({ error: 'Email is already registered.' })
  })

  // Additional tests for error handling, invalid inputs, etc. can be included here
})
