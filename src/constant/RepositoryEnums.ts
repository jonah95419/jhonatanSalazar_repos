export enum RepositoryEnum {
    "enable" = "E",
    "disable" = "D",
    "archived" = "A",
}

export const RepositoryValueEnum = {
    [RepositoryEnum.enable]: "HABILITADO",
    [RepositoryEnum.disable]: "DESHABILITADO",
    [RepositoryEnum.archived]: "ARCHIVADO",
}

export enum RepositoryStateEnum {
    "verify" = 604,
    "waiting" = 605,
    "approval" = 606,
}

export const RepositoryStateValueEnum = {
    [RepositoryStateEnum.verify]: "VERIFICADO",
    [RepositoryStateEnum.waiting]: "EN ESPERA",
    [RepositoryStateEnum.approval]: "APROVADO",
    [0]: "-"
}