export enum ErrorTypeEnum {
    "error400" = 400,
    "error404" = 404,
}

export const ErrorMessageEnum = {
    [ErrorTypeEnum.error400]: "Cuerpo de la petición inválido.",
    [ErrorTypeEnum.error404]: "Registro no encontrado.",
}