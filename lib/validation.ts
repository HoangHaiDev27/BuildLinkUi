// Validate dùng chung cho các luồng xác thực (login, register, company
// register, verify-email). Một nguồn sự thật để quy tắc không bị lệch giữa các form.

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const PHONE_RE = /^0\d{9,10}$/
export const PASSWORD_MIN = 6

/** Trả về thông báo lỗi, hoặc null nếu hợp lệ. */
export function validateEmail(email: string): string | null {
  return EMAIL_RE.test(email.trim()) ? null : 'Vui lòng nhập email hợp lệ.'
}

export function validatePassword(password: string): string | null {
  return password.length >= PASSWORD_MIN
    ? null
    : `Mật khẩu cần tối thiểu ${PASSWORD_MIN} ký tự.`
}

export function validateConfirmPassword(password: string, confirm: string): string | null {
  return password === confirm ? null : 'Mật khẩu xác nhận không khớp.'
}

/** Chấp nhận khoảng trắng/dấu chấm/gạch nối; kiểm tra số bắt đầu bằng 0, 10-11 chữ số. */
export function validatePhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, '')
  return PHONE_RE.test(digits) ? null : 'Số điện thoại không hợp lệ (bắt đầu bằng 0).'
}

// Backend trả thông báo dạng "Tài khoản chưa xác thực email...". Dùng để nhận
// diện lỗi và điều hướng người dùng sang luồng xác thực email.
export function isUnverifiedError(message?: string): boolean {
  return !!message && message.toLowerCase().includes('chưa xác thực')
}
