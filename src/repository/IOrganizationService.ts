import { OrganizationCreateRequest } from "types/organization_create_request";
import { OrganizationResponse } from "types/organization_response";
import { Organization } from "../entities/organization.entity";

export interface IOrganizationService {
  /**
   * @description Create a Organization Item
   * @param organization new item, ommit id_organization
   * @returns a boolean indicated the status
   */
  createOrganization(
    organization: OrganizationCreateRequest
  ): Promise<OrganizationResponse>;

  /**
   * @description Update a Organization Item
   * @param organization item to update
   * @returns a boolean indicated the status
   */
  updateOrganization(
    organization: Organization
  ): Promise<OrganizationResponse>;

  /**
   * @description Get all Organizations
   * @returns list all Organizations
   */
  getAllOrganizations(): Promise<OrganizationResponse>;

  /**
   * @description Get item Organization by id_organization
   * * @param id_organization item to search
   * @returns Item Organization
   */
  getItemOrganization(id_organization: number): Promise<OrganizationResponse>;

  /**
   * @description Create a Organization Item
   * @param id_organization item to delete
   * @returns list all Organizations
   */
  deleteOrganization(
    id_organization: number
  ): Promise<OrganizationResponse>;
}
