import { LogoutButton } from '@/components/logout-button'
import { buttonVariants } from '@/components/ui/button'
import { getUser } from '@/lib/auth'
import Link from 'next/link'

export default async function Home() {
  const user = await getUser()

  return (
    <div>
      {JSON.stringify(user)}
      {user ? (
        <LogoutButton />
      ) : (
        <Link href="/sign-in" className={buttonVariants()}>
          Sign In
        </Link>
      )}
    </div>
  )
}
