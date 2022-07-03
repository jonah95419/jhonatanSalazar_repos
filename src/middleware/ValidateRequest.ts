import { ErrorMessageEnum, ErrorTypeEnum } from "../constant/ErrorEnum";
import { NextFunction, Request, Response } from "express";
import { get, isEmpty, isUndefined } from "lodash";
import { validateAttr } from "../../validateAttr";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction,
  params?: { body?: string; path?: string }
) {
  if (isUndefined(params) || isEmpty(params)) next();

  const reqValue: object = !isEmpty(get(params, "body", ""))
    ? req.body
    : { id_organization: Number(req.path.split("/")[1]) };
  const paramsValues: string = !isEmpty(get(params, "body", ""))
    ? params!.body!
    : params!.path!;

  if (isUndefined(reqValue) || isEmpty(reqValue))
    return res.status(ErrorTypeEnum.error400).send({
      ok: false,
      message: ErrorMessageEnum[ErrorTypeEnum.error400],
    });

  const validate: boolean = await validateAttr(reqValue, paramsValues);

  if (!validate)
    return res.status(ErrorTypeEnum.error400).send({
      ok: false,
      message: ErrorMessageEnum[ErrorTypeEnum.error400],
    });

  req.body = reqValue;

  next();
}
