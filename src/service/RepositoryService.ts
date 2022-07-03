import { Repository } from "typeorm";

import { AppDataSource } from "../config/data-source";
import { IRepositoryService } from "repository/IRepositoryService";

import { Repository as RepositoryEntity } from "../entities/repository.entity";
import { TribeService } from "./TribeService";
import { generateMessageError, validateItem } from "../utils/CommonFunctions";
import { MessageEnum } from "../constant/MessageEnum";
import { ErrorTypeEnum } from "../constant/ErrorEnum";
import { RepositoryResponse } from "types/repository_response";

/**
 * RepositoryService Implementation
 */
export class RepositoryService implements IRepositoryService {
  private readonly _storage: Repository<RepositoryEntity>;
  private readonly _tribeService: TribeService;

  constructor() {
    this._storage = AppDataSource.getRepository(RepositoryEntity);
    this._tribeService = new TribeService();
  }

  getItemRepositoryById = async (id_repository: number) : Promise<RepositoryResponse> => {
    try {
      const data: RepositoryEntity = await validateItem<RepositoryEntity>(
        { id_repository },
        this._storage,
        ErrorTypeEnum.repository404
      );

      return {
        data,
        ok: true,
      };
    } catch (error: unknown) {
      return generateMessageError<RepositoryResponse>(error);
    }
  }

  getAllRepositories = async (id_tribe: number): Promise<RepositoryResponse> => {
    try {
      const tribe: any = await this._tribeService.getItemTribeById(id_tribe);

      if (!tribe.ok) return generateMessageError<RepositoryResponse>(tribe);

      const data: RepositoryEntity[] = await this._storage.find();

      return {
        data,
        count: 0,
        ok: true,
      };
    } catch (error) {
      return generateMessageError<RepositoryResponse>(error);
    }
  };

  createRepository = async (repository: any): Promise<RepositoryResponse> => {
    try {
      const tribe: any = await this._tribeService.getItemTribeById(
        repository.id_tribe
      );

      if (!tribe.ok) return generateMessageError<RepositoryResponse>(tribe);

      const repositoryToSave: RepositoryEntity = new RepositoryEntity();

      repositoryToSave.tribe = tribe.data;
      repositoryToSave.name = repository.name;
      repositoryToSave.state = repository.state;
      repositoryToSave.create_time = new Date();
      repositoryToSave.status = repository.status;

      const data: RepositoryEntity  = await this._storage.save(repositoryToSave);

      return {
        data,
        message: MessageEnum.create_successful,
        ok: true,
      };
    } catch (error: unknown) {
      return generateMessageError<RepositoryResponse>(error);
    }
  };

  updateRepository = async (repository: any): Promise<RepositoryResponse> => {
    try {
      const repositoryToUpdate: RepositoryEntity =
        await validateItem<RepositoryEntity>(
          { id_repository: repository.id_repository },
          this._storage,
          ErrorTypeEnum.organization404
        );

      repositoryToUpdate.name = repository.name;
      repositoryToUpdate.status = repository.status;
      repositoryToUpdate.state = repository.state;

      const data: RepositoryEntity = await this._storage.save(repositoryToUpdate!);

      return {
        data,
        message: MessageEnum.update_successful,
        ok: true,
      };
    } catch (error: unknown) {
      return generateMessageError<RepositoryResponse>(error);
    }
  };
}
