"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AuthShell,
  SocialButtons,
  OrDivider,
  Captcha,
} from "@/components/auth-shell";
import { apiClient } from "@/lib/api-client";
import { useRouter } from "next/navigation";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  function validate() {
    if (!EMAIL_RE.test(email)) {
      setError("Vui lòng nhập email hợp lệ.");
      return false;
    }
    if (password.length < 6) {
      setError("Mật khẩu cần tối thiểu 6 ký tự.");
      return false;
    }
    if (!verified) {
      setError("Vui lòng xác minh bạn không phải là robot.");
      return false;
    }
    setError("");
    return true;
  }

  // function submit(mode: "password" | "link") {
  //   if (!validate()) return;
  //   setPending(mode);
  //   // No backend yet — simulate the request so the states are real.
  //   setTimeout(() => {
  //     setPending(null);
  //     if (mode === "link") {
  //       toast.success("Đã gửi liên kết đăng nhập", {
  //         description: `Kiểm tra hộp thư ${email} để tiếp tục.`,
  //       });
  //     } else {
  //       toast.info("Đăng nhập bằng mật khẩu đang được hoàn thiện", {
  //         description:
  //           "Tạm thời bạn có thể dùng liên kết qua email hoặc tài khoản mạng xã hội.",
  //       });
  //     }
  //   }, 900);
  // }
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setPending(true);
    // Gọi API login của backend
    const response = await apiClient.post("/api/Auth/login", {
      email,
      password,
    });
    setPending(false);
    if (response.success) {
      toast.success("Đăng nhập thành công", {
        description: "Đang chuyển hướng về trang chủ...",
      });
      router.push("/"); // Chuyển hướng sau khi login thành công
    } else {
      setError(response.message || "Email hoặc mật khẩu không chính xác.");
      toast.error("Đăng nhập thất bại", {
        description: response.message,
      });
    }
  }

  return (
    <AuthShell>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          Đăng nhập VậtLiệu Pro
        </h1>
        <p className="text-sm text-muted-foreground mt-1.5">
          Vui lòng nhập thông tin để đăng nhập vào tài khoản của bạn
        </p>
      </div>

      <SocialButtons />
      <OrDivider />
      <form className="space-y-5" onSubmit={handleLogin}>
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
              setEmail(e.target.value);
              if (error) setError("");
            }}
            aria-invalid={!!error}
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password">
              Mật khẩu <span className="text-destructive">*</span>
            </Label>
            <Link href="#" className="text-xs text-primary hover:underline">
              Quên mật khẩu?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPw ? "text" : "password"}
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError("");
              }}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground"
            >
              {showPw ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
        <Captcha verified={verified} onToggle={() => setVerified((v) => !v)} />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" size="lg" className="w-full" disabled={pending}>
          {pending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Đang đăng nhập...
            </>
          ) : (
            "Đăng nhập bằng mật khẩu"
          )}
        </Button>
      </form>
      <p className="text-center text-sm text-muted-foreground mt-6">
        Nếu bạn chưa có tài khoản.{" "}
        <Link
          href="/register"
          className="font-semibold text-primary hover:text-accent transition-colors"
        >
          Đăng ký
        </Link>
      </p>
    </AuthShell>
  );
}
