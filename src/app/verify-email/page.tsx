import { VerifyEmailForm } from './verify-email-form'

export const metadata = { title: 'Verifying...' }

export default function VerifyEmail() {
  return (
    <div className="fixed-layout f-box pb-20">
      <VerifyEmailForm />
    </div>
  )
}
