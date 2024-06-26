import { BackButton } from './back-button'
import { CompanyLogo } from '@/components/company-logo'

export default function Layout({
  children,
}: Readonly<React.PropsWithChildren>) {
  return (
    <div className="fixed-layout f-col xl:grid grid-cols-2">
      <BackButton />
      <div className="xl:f-col xl:f-box gap-4 hidden">
        <CompanyLogo px={200} />
        <div className="f-col items-center gap-0.5">
          <h2 className="text-3xl font-semibold">Your Company</h2>
          <p className="text-zinc-400">Your cool slogan.</p>
        </div>
      </div>
      <div className="f-col f-box mt-20 xl:mt-0">
        <CompanyLogo px={60} className="flex xl:hidden" />
        {children}
      </div>
    </div>
  )
}
