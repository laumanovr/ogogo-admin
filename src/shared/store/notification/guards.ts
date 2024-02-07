import { ResultError, ValidationErrors } from './types'

export const isResultError = (data: ResultError | ValidationErrors): data is ResultError =>
  data && 'error' in data
export const isValidationErrors = (
  data: ResultError | ValidationErrors
): data is ValidationErrors => data && 'errors' in data
