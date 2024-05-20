import { ValidationError } from "../types"

export const isError = (data: unknown): data is ValidationError => {
  return (data as ValidationError).code !== undefined
}