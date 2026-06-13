import type { Metadata, Viewport } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const beVietnam = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-be-vietnam',
})

export const metadata: Metadata = {
  title: 'VậtLiệu Pro | Vật liệu & Thi công trọn gói',
  description:
    'Chuyên cung cấp vật liệu xây dựng, gạch ốp lát, sơn, thiết bị vệ sinh và dịch vụ thi công trọn gói. Báo giá nhanh, giao hàng toàn quốc.',
  keywords: 'vật liệu xây dựng, gạch ốp lát, thi công nội thất, sơn nhà, thiết bị vệ sinh',
  openGraph: {
    title: 'VậtLiệu Pro | Vật liệu & Thi công trọn gói',
    description: 'Chuyên cung cấp vật liệu xây dựng và dịch vụ thi công trọn gói.',
    type: 'website',
    locale: 'vi_VN',
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#1e2a4a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={beVietnam.variable}>
      <body className="font-sans antialiased bg-background text-foreground" suppressHydrationWarning>
        {children}
        <Toaster position="bottom-right" richColors />
        <Analytics />
      </body>
    </html>
  )
}
