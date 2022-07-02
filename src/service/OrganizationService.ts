import { Repository } from "typeorm";
import { get, isNull } from "lodash";

import { AppDataSource } from "../config/data-source";
import { IOrganizationService } from "repository/IOrganizationService";

import { MessageEnum } from "../constant/MessageEnum";
import { ErrorMessageEnum, ErrorTypeEnum } from "../constant/ErrorEnum";
import { OrganizationDTO } from "../entities/organization.entity";
import { OrganizationCreateRequest } from "types/organization_create_request";
import { OrganizationGetDeleteResponse } from "types/organization_get_delete_response";
import { OrganizationCreateUpdateResponse } from "types/organization_create_update_response";

/**
 * OrganizationService Implementation
 */
export class OrganizationService implements IOrganizationService {
  private readonly storage: Repository<OrganizationDTO>;

  constructor() {
    this.storage = AppDataSource.getRepository(OrganizationDTO);
  }

  createOrganization = async (
    organization: OrganizationCreateRequest
  ): Promise<OrganizationCreateUpdateResponse> => {
    try {
      const organizationToSave: OrganizationDTO = new OrganizationDTO();

      organizationToSave.name = organization.name;
      organizationToSave.status = organization.status;

      const data = await this.storage.save(organizationToSave);

      return {
        data,
        message: MessageEnum.create_successful,
        ok: true,
      };
    } catch (error: unknown) {
      return this._generateMessageError<OrganizationCreateUpdateResponse>(
        error
      );
    }
  };

  updateOrganization = async (
    organization: OrganizationDTO
  ): Promise<OrganizationCreateUpdateResponse> => {
    try {
      const organizationToUpdate: OrganizationDTO =
        await this._validateExistOrganization(organization.id);

      organizationToUpdate.name = organization.name;
      organizationToUpdate.status = organization.status;

      const data = await this.storage.save(organizationToUpdate!);

      return {
        data,
        message: MessageEnum.update_successful,
        ok: true,
      };
    } catch (error: unknown) {
      return this._generateMessageError<OrganizationCreateUpdateResponse>(
        error
      );
    }
  };

  getOrganizations = async (): Promise<OrganizationGetDeleteResponse> => {
    try {
      const [data, count]: [OrganizationDTO[], number] =
        await this.storage.findAndCount();

      return {
        data,
        count,
        ok: true,
      };
    } catch (error) {
      return this._generateMessageError<OrganizationGetDeleteResponse>(error);
    }
  };

  deleteOrganization = async (
    id: number
  ): Promise<OrganizationGetDeleteResponse> => {
    try {
      const organization: OrganizationDTO = await this._validateExistOrganization(
        id
      );
      await this.storage.remove(organization!);
      const [data, count]: [OrganizationDTO[], number] =
        await this.storage.findAndCount();

      return {
        data,
        count,
        message: MessageEnum.delete_successful,
        ok: true,
      };
    } catch (error) {
      return this._generateMessageError<OrganizationGetDeleteResponse>(error);
    }
  };

  private async _validateExistOrganization(id: number): Promise<OrganizationDTO> {
    const organizationToUpdate: OrganizationDTO | null =
      await this.storage.findOneBy({
        id,
      });

    if (isNull(organizationToUpdate))
      throw new Error(ErrorMessageEnum[ErrorTypeEnum.error404]);

    return organizationToUpdate;
  }

  private _generateMessageError<T extends object>(error: unknown): T {
    return <T>{
      ok: false,
      message: get(error, "message", ""),
    };
  }
}
