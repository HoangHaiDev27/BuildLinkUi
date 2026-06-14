'use client'

import { useCallback, useEffect, useState } from 'react'
import { apiClient } from '@/lib/api-client'
import {
  AUTH_EVENT,
  type AuthUser,
  clearStoredUser,
  getStoredUser,
} from '@/lib/auth'

interface UseAuth {
  user: AuthUser | null
  isAuthenticated: boolean
  // `false` until the client has read localStorage. Use it to avoid an
  // SSR/CSR hydration mismatch: render a neutral placeholder while loading.
  ready: boolean
  logout: () => Promise<void>
}

export function useAuth(): UseAuth {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setUser(getStoredUser())
    setReady(true)

    const sync = () => setUser(getStoredUser())
    // Same-tab updates (login/logout in this tab) + cross-tab updates.
    window.addEventListener(AUTH_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(AUTH_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const logout = useCallback(async () => {
    // Tell the backend to revoke the refresh token and clear the HttpOnly
    // cookies. Same-origin (via Next rewrite), so the cookies ride along.
    try {
      await apiClient.post('/api/Auth/logout', {})
    } catch {
      // Even if the call fails, drop the local session.
    }
    clearStoredUser()
  }, [])

  return { user, isAuthenticated: !!user, ready, logout }
}
