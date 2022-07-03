import { Repository } from "typeorm";
import { isEmpty, isNull } from "lodash";

import { AppDataSource } from "../config/data-source";
import { ITribeService } from "repository/ITribeService";
import { OrganizationService } from "./OrganizationService";

import { Tribe } from "../entities/tribe.entity";
import { Organization } from "../entities/organization.entity";

import { MessageEnum } from "../constant/MessageEnum";
import { ErrorMessageEnum, ErrorTypeEnum } from "../constant/ErrorEnum";
import { generateMessageError, validateItem } from "../utils/CommonFunctions";
import { TribeResponse } from "types/tribe_response";
import { OrganizationResponse } from "types/organization_response";

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
      const data: Tribe[] = await this._storage.find({
        where: {id_tribe},
      });

      if (isNull(data) || isEmpty(data))
        throw new Error(ErrorMessageEnum[ErrorTypeEnum.tribe404]);

      return {
        data,
        ok: true,
      };
    } catch (error) {
      return generateMessageError<TribeResponse>(error);
    }
  };

  getItemTribeById = async (id_tribe: number): Promise<TribeResponse> => {
    try {
      const data: Tribe | null = await this._storage.findOneBy({
        id_tribe
      });

      if (isNull(data) || isEmpty(data))
        throw new Error(ErrorMessageEnum[ErrorTypeEnum.tribe404]);

      return {
        data,
        ok: true,
      };
    } catch (error) {
      return generateMessageError<TribeResponse>(error);
    }
  };

  createTribe = async (tribu: any): Promise<TribeResponse> => {
    try {
      const tribuToSave: Tribe = new Tribe();
      const organization: OrganizationResponse =
        await this._organizationService.getItemOrganization(
          tribu.id_organization
        );

      if (!organization.ok)
        return generateMessageError<TribeResponse>(organization); 

      tribuToSave.name = tribu.name;
      tribuToSave.status = tribu.status;
      tribuToSave.organization = <Organization>organization.data;

      const data: Tribe = await this._storage.save(tribuToSave);

      return {
        data,
        message: MessageEnum.create_successful,
        ok: true,
      };
    } catch (error: unknown) {
      return generateMessageError<TribeResponse>(error);
    }
  };

  updateTribe = async (tribu: Tribe): Promise<TribeResponse> => {
    try {
      const tribuToUpdate: Tribe = await validateItem<Tribe>(
        { id_tribe: tribu.id_tribe },
        this._storage,
        ErrorTypeEnum.tribe404
      );

      tribuToUpdate.name = tribu.name;
      tribuToUpdate.status = tribu.status;

      const data:Tribe  = await this._storage.save(tribuToUpdate!);

      return {
        data,
        message: MessageEnum.update_successful,
        ok: true,
      };
    } catch (error: unknown) {
      return generateMessageError<TribeResponse>(error);
    }
  };
}
