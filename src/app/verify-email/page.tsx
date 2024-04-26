import { Suspense } from 'react'
import { VerifyEmail } from './verify-email'

export const metadata = { title: 'Verifying...' }

export default function Page() {
  return (
    <div className="fixed f-box left-0 pb-20 top-0 z-20 h-screen w-screen bg-background">
      <Suspense fallback={<p>Loading...</p>}>
        <VerifyEmail />
      </Suspense>
    </div>
  )
}
