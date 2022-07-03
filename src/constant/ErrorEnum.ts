import { MessageValues } from "./MessagesValues";

export enum ErrorTypeEnum {
  "error400" = 400,
  "error404" = 404,
}

export const ErrorMessageEnum = {
  [ErrorTypeEnum.error400]: MessageValues.MESSAGE_400,
  [ErrorTypeEnum.error404]: MessageValues.MESSAGE_404,
};
