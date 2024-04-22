import { Suspense } from 'react'
import { AuthCard } from '../auth-card'
import { NewPassword } from './new-password'

export const metadata = { title: 'Reset Password' }

export default function Page() {
  return (
    <AuthCard
      header="Reset your Password"
      subHeader="This will replace your old password."
    >
      <Suspense fallback={<p>Loading...</p>}>
        <NewPassword />
      </Suspense>
    </AuthCard>
  )
}
