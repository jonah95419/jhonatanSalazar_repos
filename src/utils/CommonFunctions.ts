import { get, isNull } from "lodash";
import { Repository } from "typeorm";

import { ErrorMessageEnum, ErrorTypeEnum } from "../constant/ErrorEnum";

export function generateMessageError<T extends object>(error: unknown): T {
  return <T>{
    ok: false,
    message: get(error, "message", ""),
  };
}

export async function validateItem<T extends object>(
  id: object,
  storage: Repository<T>,
  error: ErrorTypeEnum
): Promise<T> {
  const item: T | null = await storage.findOneBy(id);

  if (isNull(item))
    throw new Error(ErrorMessageEnum[error]);

  return item;
}
