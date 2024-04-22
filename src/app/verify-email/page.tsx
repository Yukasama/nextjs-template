import { Suspense } from 'react'
import { VerifyEmail } from './verify-email'

export const metadata = { title: 'Verifying...' }

export default function Page() {
  return (
    <div className="f-box fixed left-0 top-0 z-20 h-screen w-screen bg-background">
      <Suspense fallback={<p>Loading...</p>}>
        <VerifyEmail />
      </Suspense>
    </div>
  )
}
