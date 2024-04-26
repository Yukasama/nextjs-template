import { Suspense } from 'react'
import { VerifyEmail } from './verify-email'

export const metadata = { title: 'Verifying...' }

export default function Page() {
  return (
    <div className="fixed-layout f-box pb-20">
      <Suspense fallback={<p>Loading...</p>}>
        <VerifyEmail />
      </Suspense>
    </div>
  )
}
