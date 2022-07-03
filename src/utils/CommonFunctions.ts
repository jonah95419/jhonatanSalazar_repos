import { get } from "lodash";

export function generateMessageError<T extends object>(error: unknown): T {
  return <T>{
    ok: false,
    message: get(error, "message", ""),
  };
}