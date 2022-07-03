import { OrganizationCreateRequest } from "types/organization_create_request";
import { OrganizationCreateUpdateResponse } from "types/organization_create_update_response";
import { OrganizationGetDeleteResponse } from "types/organization_get_delete_response";
import { Organization } from "../entities/organization.entity";

export interface IOrganizationService {
  /**
   * @description Create one organization
   * @param organization new item, ommit id_organization
   * @returns a boolean indicated the status
   */
  createOrganization(
    organization: OrganizationCreateRequest
  ): Promise<OrganizationCreateUpdateResponse>;

  /**
   * @description Create one organization
   * @param organization item to update
   * @returns a boolean indicated the status
   */
  updateOrganization(
    organization: Organization
  ): Promise<OrganizationCreateUpdateResponse>;

  /**
   * @description Get all Organizations
   * @returns list all Organizations
   */
  getOrganizations(): Promise<OrganizationGetDeleteResponse>;

  /**
   * @description Create one organization
   * @param idOrganization item to delete
   * @returns list all Organizations
   */
  deleteOrganization(
    idOrganization: number
  ): Promise<OrganizationGetDeleteResponse>;
}
