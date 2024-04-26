import { Suspense } from 'react'
import { NewPassword } from './new-password'

export const metadata = { title: 'Reset Password' }

export default function Page() {
  return (
    <div className="fixed-layout f-box pb-20">
      <Suspense fallback={<p>Loading...</p>}>
        <NewPassword />
      </Suspense>
    </div>
  )
}
