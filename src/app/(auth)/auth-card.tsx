import { cn } from '@/lib/utils'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  header: string
  subHeader: string
  children: React.ReactNode
}

export const AuthCard = ({ header, subHeader, children, className }: Props) => {
  return (
    <div className={cn('md:p-3 f-col gap-5 w-[400px] sm:w-[500px]', className)}>
      <div className="f-col gap-1 items-center">
        <h3 className="font-semibold text-2xl">{header}</h3>
        <p className="text-zinc-400 text-[15px]">{subHeader}</p>
      </div>
      {children}
    </div>
  )
}
