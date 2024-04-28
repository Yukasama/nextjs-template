import { ResetPasswordForm } from './reset-password-form'

export const metadata = { title: 'Reset Password' }

export default function ResetPassword() {
  return (
    <div className="fixed-layout f-box pb-20">
      <ResetPasswordForm />
    </div>
  )
}
