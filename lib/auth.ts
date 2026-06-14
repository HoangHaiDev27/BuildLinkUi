// Client-side session snapshot.
//
// The backend issues `access_token` / `refresh_token` as HttpOnly cookies
// (see BuildLinkApi AuthController), which JavaScript cannot read. The login
// response body, however, returns the account info. We persist that snapshot
// locally so the UI (navbar, etc.) can tell logged-in from logged-out, and we
// drop a readable `bl_session` marker cookie alongside it so a plain
// "is there a session cookie?" check works too.

const STORAGE_KEY = 'bl_user'
const SESSION_COOKIE = 'bl_session'
export const AUTH_EVENT = 'bl-auth-change'

export interface AuthUser {
  accountId: string
  email: string
  accountType: string
  roles: string[]
  displayName: string
}

// Shape returned by /api/Auth/login -> data
interface AuthResponseData {
  accountId?: string
  email?: string
  accountType?: string
  roles?: string[]
}

export function displayNameFromEmail(email: string): string {
  const local = email.split('@')[0] ?? email
  return local
    .replace(/[._-]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
    .trim() || email
}

export function initialsFrom(name: string, email: string): string {
  const source = (name || email || '').trim()
  if (!source) return 'U'
  const parts = source.split(/\s+/).filter(Boolean)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function toAuthUser(data: AuthResponseData | null | undefined): AuthUser | null {
  if (!data?.email) return null
  return {
    accountId: data.accountId ?? '',
    email: data.email,
    accountType: data.accountType ?? '',
    roles: data.roles ?? [],
    displayName: displayNameFromEmail(data.email),
  }
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

export function setStoredUser(user: AuthUser): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  // Readable companion marker (NOT the auth token, just a presence flag).
  document.cookie = `${SESSION_COOKIE}=1; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`
  window.dispatchEvent(new Event(AUTH_EVENT))
}

export function clearStoredUser(): void {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(STORAGE_KEY)
  document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0; samesite=lax`
  window.dispatchEvent(new Event(AUTH_EVENT))
}
