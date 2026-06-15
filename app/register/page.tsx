'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2, Eye, EyeOff, Building2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { AuthShell, SocialButtons, OrDivider, Captcha } from '@/components/auth-shell'
import { type TurnstileInstance } from '@marsidev/react-turnstile'
import { apiClient } from '@/lib/api-client'
import { validateEmail, validatePassword, validatePhone } from '@/lib/validation'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [agree, setAgree] = useState(false)
  const [captchaToken, setCaptchaToken] = useState('')
  const captchaRef = useRef<TurnstileInstance>(null)
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  function set(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
    if (error) setError('')
  }

  function validate() {
    if (form.name.trim().length < 2) return 'Vui lòng nhập họ và tên.'
    const emailErr = validateEmail(form.email)
    if (emailErr) return emailErr
    const phoneErr = validatePhone(form.phone)
    if (phoneErr) return phoneErr
    const pwErr = validatePassword(form.password)
    if (pwErr) return pwErr
    if (!agree) return 'Vui lòng đồng ý với điều khoản sử dụng.'
    if (!captchaToken) return 'Vui lòng xác minh bạn không phải là robot.'
    return ''
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const err = validate()
    if (err) {
      setError(err)
      return
    }
    setError('')
    setPending(true)

    const response = await apiClient.post('/api/Auth/register', {
      email: form.email,
      password: form.password,
      confirmPassword: form.password,
      phoneNumber: form.phone,
      address: '',
      roleName: 'Customer',
      userName: form.name,
      companyName: '',
      captchaToken,
    })

    setPending(false)

    if (response.success) {
      toast.success('Tạo tài khoản thành công', {
        description: 'Vui lòng kiểm tra email để nhận mã xác thực.',
      })
      router.push(`/verify-email?email=${encodeURIComponent(form.email)}`)
    } else {
      // Token Turnstile dùng 1 lần — thất bại thì làm mới widget.
      captchaRef.current?.reset()
      setCaptchaToken('')
      setError(response.message || 'Đăng ký thất bại.')
      toast.error('Đăng ký thất bại', {
        description: response.message,
      })
    }
  }

  return (
    <AuthShell>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Đăng ký VậtLiệu Pro</h1>
        <p className="text-sm text-muted-foreground mt-1.5">
          Tạo tài khoản để mua vật liệu và yêu cầu báo giá thi công
        </p>
      </div>

      <Link
        href="/company/register"
        className="group mb-6 flex items-center gap-3 rounded-xl border border-border bg-secondary/40 p-3.5 transition-colors hover:border-accent"
      >
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent/10">
          <Building2 className="w-4 h-4 text-accent" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground">Bạn là doanh nghiệp?</p>
          <p className="text-xs text-muted-foreground">Đăng ký gian hàng đối tác để bán vật liệu, cung cấp dịch vụ.</p>
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
      </Link>

      <SocialButtons />
      <OrDivider />

      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="space-y-2">
          <Label htmlFor="name">
            Họ và tên <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            autoComplete="name"
            placeholder="Nguyễn Văn An"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Nhập email"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            Số điện thoại <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="0901 234 567"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">
            Mật khẩu <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPw ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Tối thiểu 6 ký tự"
              value={form.password}
              onChange={(e) => set('password', e.target.value)}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              aria-label={showPw ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <label className="flex items-start gap-2.5 text-sm text-muted-foreground cursor-pointer pt-1">
          <Checkbox
            checked={agree}
            onCheckedChange={(v) => {
              setAgree(v === true)
              if (error) setError('')
            }}
            className="mt-0.5"
          />
          <span>
            Tôi đồng ý với{' '}
            <Link href="#" className="text-primary font-medium hover:text-accent">
              Điều khoản
            </Link>{' '}
            và{' '}
            <Link href="#" className="text-primary font-medium hover:text-accent">
              Chính sách bảo mật
            </Link>{' '}
            của VậtLiệu Pro.
          </span>
        </label>

        <Captcha
          ref={captchaRef}
          onVerify={setCaptchaToken}
          onExpire={() => setCaptchaToken('')}
        />

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button type="submit" size="lg" className="w-full" disabled={pending}>
          {pending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Đang tạo tài khoản...
            </>
          ) : (
            'Tạo tài khoản'
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Đã có tài khoản?{' '}
        <Link href="/login" className="font-semibold text-primary hover:text-accent transition-colors">
          Đăng nhập
        </Link>
      </p>
    </AuthShell>
  )
}
