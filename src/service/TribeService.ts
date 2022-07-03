import { Repository } from "typeorm";
import { get, isEmpty, isNull } from "lodash";

import { AppDataSource } from "../config/data-source";
import { ITribeService } from "repository/ITribeService";
import { OrganizationService } from "./OrganizationService";

import { Tribe } from "../entities/tribe.entity";
import { Organization } from "../entities/organization.entity";

import { generateMessageError } from "../utils/CommonFunctions";
import { TribeResponse } from "types/tribe_response";
import { OrganizationResponse } from "types/organization_response";
import { MessageValues } from "../constant/MessagesValues";

/**
 * TribeService Implementation
 */
export class TribeService implements ITribeService {
  private readonly _storage: Repository<Tribe>;
  private readonly _organizationService: OrganizationService;

  constructor() {
    this._storage = AppDataSource.getRepository(Tribe);
    this._organizationService = new OrganizationService();
  }

  getAllTribesById = async (id_tribe: number): Promise<TribeResponse> => {
    try {
      const [data, count]: [Tribe[], number] = await this._storage.findAndCount(
        { where: { id_tribe }}
      );

      if (isNull(data) || isEmpty(data))
        throw new Error(MessageValues.MESSAGE_T404);

      return {
        data,
        count,
        ok: true,
      };
    } catch (error) {
      return generateMessageError(error);
    }
  };

  getItemTribeById = async (id_tribe: number): Promise<TribeResponse> => {
    try {
      const data: Tribe | null = await this._storage.findOneBy({
        id_tribe,
      });

      if (isNull(data) || isEmpty(data))
        throw new Error(MessageValues.MESSAGE_T404);

      return {
        data,
        ok: true,
      };
    } catch (error) {
      return generateMessageError(error);
    }
  };

  createTribe = async (tribe: Tribe): Promise<TribeResponse> => {
    try {
      const organization: OrganizationResponse =
        await this._organizationService.getItemOrganization(
          get(tribe, "id_organization", "")
        );

      if (!organization.ok) throw new Error(organization.message);

      const tribeToSave: Tribe = new Tribe();
      tribeToSave.name = tribe.name;
      tribeToSave.status = tribe.status;
      tribeToSave.organization = <Organization>organization.data;

      const data: Tribe = await this._storage.save(tribeToSave);

      return {
        data,
        message: MessageValues.CREATE_SUCCESSFUL,
        ok: true,
      };
    } catch (error: unknown) {
      return generateMessageError(error);
    }
  };

  updateTribe = async (tribu: Tribe): Promise<TribeResponse> => {
    try {
      const tribuToUpdate: Tribe | null = await this._storage.findOneBy({
        id_tribe: tribu.id_tribe,
      });

      if (isNull(tribuToUpdate)) throw new Error(MessageValues.MESSAGE_T404);

      tribuToUpdate.name = tribu.name;
      tribuToUpdate.status = tribu.status;

      const data: Tribe = await this._storage.save(tribuToUpdate!);

      return {
        data,
        message: MessageValues.UPDATE_SUCCESSFUL,
        ok: true,
      };
    } catch (error: unknown) {
      return generateMessageError(error);
    }
  };
}
