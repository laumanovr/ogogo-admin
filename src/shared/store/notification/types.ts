import { AxiosError } from 'axios'

export interface NotificationState {
  isOpen: boolean
  text: string
  color: string
  timeout: boolean
  source: string
}
export interface ResultError {
  error: { additionalInfo: string; errorCode: string; errorMessage: string }
  ok: boolean
}
export interface ValidationErrors {
  errors: {
    [key: string]: string[]
  }
  status: number
  title: string
  traceId: string
  type: string
}
export interface NotificationPayload {
  text: string
  color: string
  timeout: boolean
  source?: string
}
export type ErrorNotificationPayload = AxiosError<ResultError | ValidationErrors>
