import { AuthCard } from '../auth-card'
import ForgotPassword from './forgot-password'

export const metadata = { title: 'Forgot Password' }

export default function page() {
  return (
    <AuthCard
      header="Forgot your password?"
      subHeader="Enter your email to receive a password reset link."
    >
      <ForgotPassword />
    </AuthCard>
  )
}
