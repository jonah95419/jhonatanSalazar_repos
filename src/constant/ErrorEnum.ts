export enum ErrorTypeEnum {
  "error400" = 400,
  "error404" = 404,
  "tribe404" = "t404",
  "repository404" = "r404",
  "organization404" = "o404",
}

export const ErrorMessageEnum = {
  [ErrorTypeEnum.error400]: "Cuerpo de la petición inválido.",
  [ErrorTypeEnum.error404]: "Registro no encontrado.",
  [ErrorTypeEnum.tribe404]: "La Tribu no se encuentra registrada.",
  [ErrorTypeEnum.repository404]: "El Repositorio no se encuentra registrado.",
  [ErrorTypeEnum.organization404]: "La Organización no se encuentra registrada.",
};
