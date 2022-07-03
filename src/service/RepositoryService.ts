import { Repository } from "typeorm";
import { defaultTo, get, has, isEqual, isNull } from "lodash";

import { AppDataSource } from "../config/data-source";
import { IRepositoryService } from "repository/IRepositoryService";

import {
  callMockService,
  generateMessageError,
} from "../utils/CommonFunctions";
import { Repository as RepositoryEntity } from "../entities/repository.entity";
import { TribeService } from "./TribeService";

import { MetricsValues } from "../constant/MetricsValues";
import { MessageValues } from "../constant/MessagesValues";
import {
  RepositoryResponse,
  Repository as AllRepository,
} from "types/repository_response";
import { TribeResponse } from "types/tribe_response";
import { RepositoryComplete } from "types/repository_complete";
import { Tribe } from "../entities/tribe.entity";
import {
  RepositoryEnum,
  RepositoryStateEnum,
  RepositoryStateValueEnum,
  RepositoryValueEnum,
} from "../constant/RepositoryEnums";
import { MockResponse, State } from "types/mock_response";

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

  getItemRepositoryById = async (
    id_repository: number
  ): Promise<RepositoryResponse> => {
    try {
      const data: RepositoryEntity | null = await this._storage.findOneBy({
        id_repository,
      });

      if (isNull(data)) throw new Error(MessageValues.MESSAGE_404);

      return {
        data,
        ok: true,
      };
    } catch (error: unknown) {
      return generateMessageError(error);
    }
  };

  getAllRepositories = async (
    id_tribe: number
  ): Promise<RepositoryResponse> => {
    try {
      const tribe: TribeResponse = await this._tribeService.getItemTribeById(
        id_tribe
      );

      if (!tribe.ok) throw new Error(tribe.message);

      const data: RepositoryEntity[] = await this._storage.find({
        where: { tribe: { id_tribe } },
      });
      const validateCoverage: boolean = this._validateCoverageRepository(data);

      if (!validateCoverage) throw new Error(MessageValues.COVERAGE_MINIMUM);

      const mockService: MockResponse = await callMockService();
      const response_data: object = this._validateStateRepository(
        data,
        mockService
      );

      return {
        data: response_data,
        count: 0,
        ok: true,
      };
    } catch (error) {
      return generateMessageError(error);
    }
  };

  createRepository = async (
    repository: RepositoryEntity
  ): Promise<RepositoryResponse> => {
    try {
      const tribe: TribeResponse = await this._tribeService.getItemTribeById(
        get(repository, "id_tribe", "")
      );

      if (!tribe.ok) throw new Error(tribe.message);

      const repositoryToSave: RepositoryEntity = new RepositoryEntity();

      repositoryToSave.tribe = <Tribe>tribe.data;
      repositoryToSave.name = repository.name;
      repositoryToSave.state = repository.state;
      repositoryToSave.create_time = new Date();
      repositoryToSave.status = repository.status;

      const data: RepositoryEntity = await this._storage.save(repositoryToSave);

      return {
        data,
        message: MessageValues.CREATE_SUCCESSFUL,
        ok: true,
      };
    } catch (error: unknown) {
      return generateMessageError(error);
    }
  };

  updateRepository = async (
    repository: RepositoryEntity
  ): Promise<RepositoryResponse> => {
    try {
      const repositoryToUpdate: RepositoryEntity | null =
        await this._storage.findOneBy({
          id_repository: repository.id_repository,
        });

      if (isNull(repositoryToUpdate))
        throw new Error(MessageValues.MESSAGE_R404);

      repositoryToUpdate.name = repository.name;
      repositoryToUpdate.status = repository.status;
      repositoryToUpdate.state = repository.state;

      const data: RepositoryEntity = await this._storage.save(
        repositoryToUpdate
      );

      return {
        data,
        message: MessageValues.UPDATE_SUCCESSFUL,
        ok: true,
      };
    } catch (error: unknown) {
      return generateMessageError(error);
    }
  };

  private _validateCoverageRepository(data: RepositoryEntity[]): boolean {
    return data
      .map((repository: AllRepository) => <RepositoryComplete>repository)
      .filter((repository: RepositoryComplete) => has(repository, "metrics"))
      .some(
        (repository: RepositoryComplete) =>
          Number(get(repository, "metrics.coverage", 0)) >
          MetricsValues.COVERAGE_MINIMUM
      );
  }

  private _validateStateRepository(
    data: RepositoryEntity[],
    mockService: MockResponse
  ): RepositoryComplete[] {
    return data
      .map((repository: AllRepository) => <RepositoryComplete>repository)
      .filter((repository: RepositoryComplete) =>
        this._conditionStateRepository(repository)
      )
      .map((repository: RepositoryComplete) =>
        this._mapRepositoryValues(repository, mockService)
      );
  }

  private _conditionStateRepository(repository: RepositoryComplete): boolean {
    const state: string = get(repository, "state", "");
    const created_date: string = get(repository, "create_time", "");
    const current_year: number = new Date().getFullYear();
    const created_year: number = new Date(created_date).getFullYear();

    return (
      isEqual(state, RepositoryEnum.enable) &&
      isEqual(current_year, created_year)
    );
  }

  private _mapRepositoryValues(
    repository: RepositoryComplete,
    mockService: MockResponse
  ): object {
    const id: number = Number(get(repository, "id_repository", 0));
    const stateValue: RepositoryStateEnum = <RepositoryStateEnum>(
      mockService.repositories?.find((state: State) => state.id === id)?.state
    );

    return {
      id,
      name: get(repository, "name", ""),
      tribe: get(repository, "tribe.name", ""),
      organization: get(repository, "tribe.organization.name", ""),
      coverage: `${get(repository, "metrics.coverage", 0)}%`,
      codeSmells: Number(get(repository, "metrics.code_smells", 0)),
      bugs: Number(get(repository, "metrics.bugs", 0)),
      vulnerabilities: Number(get(repository, "metrics.vulnerabilities", 0)),
      hotspots: Number(get(repository, "metrics.hotspots", 0)),
      verificationState: RepositoryStateValueEnum[stateValue],
      state: RepositoryValueEnum[RepositoryEnum.enable],
    };
  }
}
