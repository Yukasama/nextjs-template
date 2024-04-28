import { Loader } from 'lucide-react'

export default function Loading() {
  return (
    <div className="f-box gap-2 text-zinc-400 mt-[400px]">
      <Loader className="animate-spin" size={20} />
      Loading...
    </div>
  )
}
