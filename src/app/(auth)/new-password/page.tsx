import { AuthCard } from '../auth-card'
import { NewPassword } from './new-password'

export const metadata = { title: 'Reset Password' }
// export const runtime = "edge";

export default function Page() {
  return (
    <AuthCard
      header="Reset your Password"
      subHeader="This will replace your old password."
    >
      <NewPassword />
    </AuthCard>
  )
}
