import { Repository } from "typeorm";

import { AppDataSource } from "../config/data-source";
import { IOrganizationService } from "repository/IOrganizationService";

import { MessageEnum } from "../constant/MessageEnum";
import { ErrorTypeEnum } from "../constant/ErrorEnum";
import { Organization } from "../entities/organization.entity";
import { OrganizationCreateRequest } from "types/organization_create_request";
import { generateMessageError, validateItem } from "../utils/CommonFunctions";
import { OrganizationResponse } from "types/organization_response";

/**
 * OrganizationService Implementation
 */
export class OrganizationService implements IOrganizationService {
  private readonly _storage: Repository<Organization>;

  constructor() {
    this._storage = AppDataSource.getRepository(Organization);
  }

  createOrganization = async (
    organization: OrganizationCreateRequest
  ): Promise<OrganizationResponse> => {
    try {
      const organizationToSave: Organization = new Organization();

      organizationToSave.name = organization.name;
      organizationToSave.status = organization.status;

      const data = await this._storage.save(organizationToSave);

      return {
        data,
        message: MessageEnum.create_successful,
        ok: true,
      };
    } catch (error: unknown) {
      return generateMessageError<OrganizationResponse>(error);
    }
  };

  updateOrganization = async (
    organization: Organization
  ): Promise<OrganizationResponse> => {
    try {
      const organizationToUpdate: Organization =
        await validateItem<Organization>(
          { id_organization: organization.id_organization },
          this._storage,
          ErrorTypeEnum.organization404
        );

      organizationToUpdate.name = organization.name;
      organizationToUpdate.status = organization.status;

      const data = await this._storage.save(organizationToUpdate!);

      return {
        data,
        message: MessageEnum.update_successful,
        ok: true,
      };
    } catch (error: unknown) {
      return generateMessageError<OrganizationResponse>(error);
    }
  };

  getAllOrganizations = async (): Promise<OrganizationResponse> => {
    try {
      const [data, count]: [Organization[], number] =
        await this._storage.findAndCount();

      return {
        data,
        count,
        ok: true,
      };
    } catch (error) {
      return generateMessageError<OrganizationResponse>(error);
    }
  };

  getItemOrganization = async (
    id_organization: number
  ): Promise<OrganizationResponse> => {
    try {
      const data: Organization = await validateItem<Organization>(
        { id_organization },
        this._storage,
        ErrorTypeEnum.organization404
      );

      return {
        data,
        ok: true,
      };
    } catch (error: unknown) {
      return generateMessageError<OrganizationResponse>(error);
    }
  };

  deleteOrganization = async (
    id_organization: number
  ): Promise<OrganizationResponse> => {
    try {
      const organization: Organization = await validateItem<Organization>(
        { id_organization },
        this._storage,
        ErrorTypeEnum.organization404
      );
      await this._storage.remove(organization!);
      const [data, count]: [Organization[], number] =
        await this._storage.findAndCount();

      return {
        data,
        count,
        message: MessageEnum.delete_successful,
        ok: true,
      };
    } catch (error) {
      return generateMessageError<OrganizationResponse>(error);
    }
  };
}
