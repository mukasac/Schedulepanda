"use client"

import { useState } from "react"

export type ToastProps = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  return {
    toasts,
    toast: (props: Omit<ToastProps, "id">) => {
      setToasts((toasts) => [...toasts, { ...props, id: String(Date.now()) }])
    },
    dismiss: (id: string) => {
      setToasts((toasts) => toasts.filter((toast) => toast.id !== id))
    }
  }
}