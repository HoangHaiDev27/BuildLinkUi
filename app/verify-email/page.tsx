'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { Loader2, MailCheck, RotateCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { AuthShell } from '@/components/auth-shell'
import { apiClient } from '@/lib/api-client'
import { EMAIL_RE } from '@/lib/validation'

const CODE_LENGTH = 6
const RESEND_COOLDOWN = 60 // giây

function VerifyEmailForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [resending, setResending] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  // context=company khi đến từ luồng đăng ký doanh nghiệp -> hiển thị thông
  // điệp "chờ duyệt" sau khi xác thực email thành công.
  const isCompany = searchParams.get('context') === 'company'

  // Đọc email từ URL (?email=abc@gmail.com) khi vào trang.
  useEffect(() => {
    const fromUrl = searchParams.get('email') ?? ''
    if (fromUrl) setEmail(fromUrl)
  }, [searchParams])

  // Đếm ngược cho nút "Gửi lại mã".
  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setInterval(() => {
      setCooldown((s) => (s <= 1 ? 0 : s - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [cooldown])

  async function onVerify(e: React.FormEvent) {
    e.preventDefault()
    if (!EMAIL_RE.test(email)) {
      setError('Vui lòng nhập email hợp lệ.')
      return
    }
    if (code.length !== CODE_LENGTH) {
      setError(`Vui lòng nhập đủ ${CODE_LENGTH} chữ số của mã xác thực.`)
      return
    }
    setError('')
    setVerifying(true)

    const response = await apiClient.post('/api/Auth/verify-email', {
      email,
      code,
    })

    setVerifying(false)

    if (response.success) {
      toast.success('Xác thực email thành công', {
        description: isCompany
          ? 'Hồ sơ doanh nghiệp đang chờ duyệt. Chúng tôi sẽ phản hồi qua email trong 2 đến 3 ngày làm việc.'
          : 'Bạn có thể đăng nhập để bắt đầu sử dụng tài khoản.',
      })
      router.push('/login')
    } else {
      setCode('')
      setError(response.message || 'Mã xác thực không đúng hoặc đã hết hạn.')
      toast.error('Xác thực thất bại', {
        description: response.message,
      })
    }
  }

  async function onResend() {
    if (!EMAIL_RE.test(email)) {
      setError('Vui lòng nhập email hợp lệ để nhận lại mã.')
      return
    }
    setError('')
    setResending(true)

    const response = await apiClient.post('/api/Auth/resend-verification', {
      email,
    })

    setResending(false)

    if (response.success) {
      setCooldown(RESEND_COOLDOWN)
      toast.success('Đã gửi lại mã xác thực', {
        description: `Vui lòng kiểm tra hộp thư ${email} (kể cả mục spam).`,
      })
    } else {
      setError(response.message || 'Không thể gửi lại mã. Vui lòng thử lại sau.')
      toast.error('Gửi lại mã thất bại', {
        description: response.message,
      })
    }
  }

  return (
    <AuthShell>
      <div className="text-center mb-6">
        <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <MailCheck className="h-6 w-6" strokeWidth={1.75} />
        </span>
        <h1 className="text-2xl font-bold text-foreground">Xác thực email</h1>
        <p className="text-sm text-muted-foreground mt-1.5">
          Chúng tôi đã gửi mã gồm {CODE_LENGTH} chữ số đến{' '}
          {email ? (
            <span className="font-medium text-foreground">{email}</span>
          ) : (
            'email của bạn'
          )}
          . Nhập mã để hoàn tất.
        </p>
        {isCompany && (
          <p className="mt-3 rounded-lg bg-secondary/60 px-3 py-2 text-xs text-muted-foreground">
            Sau khi xác thực email, hồ sơ doanh nghiệp của bạn sẽ được gửi đi chờ
            VậtLiệu Pro duyệt.
          </p>
        )}
      </div>

      <form className="space-y-5" onSubmit={onVerify}>
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
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (error) setError('')
            }}
            aria-invalid={!!error}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="code">
            Mã xác thực <span className="text-destructive">*</span>
          </Label>
          <InputOTP
            id="code"
            maxLength={CODE_LENGTH}
            pattern={REGEXP_ONLY_DIGITS}
            value={code}
            onChange={(value) => {
              setCode(value)
              if (error) setError('')
            }}
            autoFocus={!!email}
            containerClassName="justify-center"
          >
            <InputOTPGroup className="gap-2">
              {Array.from({ length: CODE_LENGTH }).map((_, i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="h-12 w-12 rounded-md border-l text-lg"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={verifying || code.length !== CODE_LENGTH}
        >
          {verifying ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Đang xác thực...
            </>
          ) : (
            'Xác thực'
          )}
        </Button>

        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full"
          onClick={onResend}
          disabled={resending || cooldown > 0}
        >
          {resending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Đang gửi lại...
            </>
          ) : cooldown > 0 ? (
            `Gửi lại mã sau ${cooldown}s`
          ) : (
            <>
              <RotateCw className="w-4 h-4 mr-2" />
              Gửi lại mã
            </>
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Đã xác thực rồi?{' '}
        <Link
          href="/login"
          className="font-semibold text-primary hover:text-accent transition-colors"
        >
          Quay lại đăng nhập
        </Link>
      </p>
    </AuthShell>
  )
}

export default function VerifyEmailPage() {
  // useSearchParams cần được bọc trong Suspense (yêu cầu của Next.js App Router).
  return (
    <Suspense
      fallback={
        <AuthShell>
          <div className="flex items-center justify-center py-10 text-muted-foreground">
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Đang tải...
          </div>
        </AuthShell>
      }
    >
      <VerifyEmailForm />
    </Suspense>
  )
}
