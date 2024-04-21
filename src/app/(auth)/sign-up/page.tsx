import { OAuth } from '../oauth'
import Link from 'next/link'
import { SignUp } from './sign-up'
import { Separator } from '@/components/ui/separator'
import { AuthCard } from '../auth-card'

export const metadata = { title: 'Sign Up' }
// export const runtime = "edge";

export default function Page() {
  return (
    <AuthCard
      header="Create an account"
      subHeader="Enter your email below to create your account."
    >
      <div className="f-col gap-4">
        <SignUp />
        <div className="flex justify-between items-center gap-2">
          <Separator className="flex-1" />
          <p className="text-xs text-center text-zinc-400">OR CONTINUE WITH</p>
          <Separator className="flex-1" />
        </div>

        <div className="f-col gap-2">
          <OAuth provider="google" />
          <OAuth provider="github" />
        </div>
      </div>

      <div className="f-box gap-1.5 text-sm">
        <p className="text-zinc-400">Already signed up?</p>
        <Link href="/sign-in" className="font-medium">
          Sign In.
        </Link>
      </div>
    </AuthCard>
  )
}
