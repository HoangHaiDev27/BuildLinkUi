'use client'

import { forwardRef } from 'react'
import { Facebook, MessageCircle } from 'lucide-react'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import Navbar from '@/components/navbar'

/* Brand logos via Simple Icons CDN (real marks, not hand-rolled). Plain <img> avoids next/image domain config. */
const SOCIALS = [
  { name: 'Google', src: 'https://cdn.simpleicons.org/google/4285F4' },
  { name: 'Facebook', src: 'https://cdn.simpleicons.org/facebook/1877F2' },
  { name: 'Zalo', src: 'https://cdn.simpleicons.org/zalo/0068FF' },
]

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-[100dvh] flex flex-col bg-gradient-to-b from-secondary/60 to-background">
      {/* System header */}
      <Navbar />

      {/* Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-10 sm:py-14">
        <div className="w-full max-w-md bg-card rounded-2xl border border-border shadow-xl p-6 sm:p-8">
          {children}
        </div>
      </main>

      {/* Floating contact (matches site socials) */}
      <div className="fixed bottom-5 right-5 flex flex-col gap-3 z-40">
        <a
          href="#"
          aria-label="Facebook"
          className="w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
        >
          <Facebook className="w-5 h-5" />
        </a>
        <a
          href="#"
          aria-label="Zalo"
          className="w-12 h-12 rounded-full bg-accent text-accent-foreground shadow-lg flex items-center justify-center hover:bg-accent/90 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
      </div>
    </div>
  )
}

export function SocialButtons() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {SOCIALS.map((s) => (
        <button
          key={s.name}
          type="button"
          className="flex items-center justify-center gap-2 rounded-md border border-border bg-card px-2 py-2.5 text-sm font-medium text-foreground hover:bg-secondary hover:border-accent/40 transition-colors active:scale-[0.98]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.src} alt="" width={18} height={18} className="w-[18px] h-[18px]" />
          {s.name}
        </button>
      ))}
    </div>
  )
}

export function OrDivider({ label = 'hoặc' }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 my-6">
      <span className="h-px flex-1 bg-border" />
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  )
}

/**
 * Cloudflare Turnstile widget. `forwardRef` để trang cha gọi `.reset()` lấy
 * token mới sau mỗi lần login thất bại (token Turnstile chỉ dùng được 1 lần).
 * Site key đọc từ NEXT_PUBLIC_TURNSTILE_SITE_KEY.
 */
export const Captcha = forwardRef<
  TurnstileInstance,
  {
    onVerify: (token: string) => void
    onExpire: () => void
  }
>(function Captcha({ onVerify, onExpire }, ref) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  if (!siteKey) return null
  return (
    <div className="space-y-2">
      <p className="text-sm text-foreground">Xác minh bạn không phải là robot</p>
      <Turnstile
        ref={ref}
        siteKey={siteKey}
        options={{ theme: 'light', language: 'vi' }}
        onSuccess={onVerify}
        onExpire={onExpire}
        onError={onExpire}
      />
    </div>
  )
})
