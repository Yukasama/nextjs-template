import { Suspense } from 'react'
import { AuthCard } from '../(auth)/auth-card'
import { NewPassword } from './new-password'

export const metadata = { title: 'Reset Password' }

export default function Page() {
  return (
    <div className="fixed-layout f-box pb-20">
      <AuthCard
        header="Reset your Password"
        subHeader="This will replace your old password."
      >
        <Suspense fallback={<p>Loading...</p>}>
          <NewPassword />
        </Suspense>
      </AuthCard>
    </div>
  )
}
