import { getUser } from '@/lib/auth'

export default async function Home() {
  const user = await getUser()

  return <div>{JSON.stringify(user)}</div>
}
