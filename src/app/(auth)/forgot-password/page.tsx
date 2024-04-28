import { AuthCard } from '../auth-card'
import { ForgotPasswordForm } from './forgot-password-form'

export const metadata = { title: 'Forgot Password' }

export default function ForgotPassword() {
  return (
    <AuthCard
      header="Forgot your password?"
      subHeader="Enter your email to receive a password reset link."
    >
      <ForgotPasswordForm />
    </AuthCard>
  )
}
