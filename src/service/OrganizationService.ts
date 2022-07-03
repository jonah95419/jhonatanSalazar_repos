import { Repository } from "typeorm";
import { isNull } from "lodash";

import { AppDataSource } from "../config/data-source";
import { IOrganizationService } from "repository/IOrganizationService";

import { MessageValues } from "../constant/MessagesValues";
import { Organization } from "../entities/organization.entity";
import { OrganizationCreateRequest } from "types/organization_create_request";
import { generateMessageError } from "../utils/CommonFunctions";
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
        message: MessageValues.CREATE_SUCCESSFUL,
        ok: true,
      };
    } catch (error: unknown) {
      return generateMessageError(error);
    }
  };

  updateOrganization = async (
    organization: Organization
  ): Promise<OrganizationResponse> => {
    try {
      const organizationToUpdate: Organization | null =
        await this._storage.findOneBy({
          id_organization: organization.id_organization,
        });

      if (isNull(organizationToUpdate))
        throw new Error(MessageValues.MESSAGE_O404);

      organizationToUpdate.name = organization.name;
      organizationToUpdate.status = organization.status;

      const data = await this._storage.save(organizationToUpdate!);

      return {
        data,
        message: MessageValues.UPDATE_SUCCESSFUL,
        ok: true,
      };
    } catch (error: unknown) {
      return generateMessageError(error);
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
      return generateMessageError(error);
    }
  };

  getItemOrganization = async (
    id_organization: number
  ): Promise<OrganizationResponse> => {
    try {
      const data: Organization | null = await this._storage.findOneBy({
        id_organization,
      });

      if (isNull(data)) throw new Error(MessageValues.MESSAGE_O404);

      return {
        data,
        ok: true,
      };
    } catch (error: unknown) {
      return generateMessageError(error);
    }
  };

  deleteOrganization = async (
    id_organization: number
  ): Promise<OrganizationResponse> => {
    try {
      const organization: Organization | null = await this._storage.findOneBy({
        id_organization,
      });

      if (isNull(organization)) throw new Error(MessageValues.MESSAGE_O404);

      await this._storage.remove(organization!);
      const [data, count]: [Organization[], number] =
        await this._storage.findAndCount();

      return {
        data,
        count,
        message: MessageValues.DELETE_SUCCESSFUL,
        ok: true,
      };
    } catch (error) {
      return generateMessageError(error);
    }
  };
}
