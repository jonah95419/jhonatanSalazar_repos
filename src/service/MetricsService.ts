import { Metrics } from "../entities/metrics.entity";
import { Repository as RepositoryEntity } from "../entities/repository.entity";

import { AppDataSource } from "../config/data-source";
import { IMetricsService } from "repository/IMetricsService";
import { RepositoryService } from "./RepositoryService";

import { Repository } from "typeorm";
import { generateMessageError } from "../utils/CommonFunctions";
import { MetricsResponse } from "types/metrics_response";
import { MessageValues } from "../constant/MessagesValues";
import { RepositoryResponse } from "types/repository_response";

/**
 * MetricsService Implementation
 */
export class MetricsService implements IMetricsService {
  private readonly _storage: Repository<Metrics>;
  private readonly _repositoryService: RepositoryService;

  constructor() {
    this._storage = AppDataSource.getRepository(Metrics);
    this._repositoryService = new RepositoryService();
  }

  getAllMetrics = async (): Promise<MetricsResponse> => {
    try {
      const [data, count]: [Metrics[], number] =
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

  createMetrics = async (metrics: any): Promise<MetricsResponse> => {
    try {
      const repository: RepositoryResponse =
        await this._repositoryService.getItemRepositoryById(
          metrics.id_repository
        );

      if (!repository.ok) throw new Error(repository.message);;

      const metricsToSave: Metrics = new Metrics();

      metricsToSave.repository = <RepositoryEntity>repository.data;
      metricsToSave.coverage = metrics.coverage;
      metricsToSave.bugs = metrics.bugs;
      metricsToSave.vulnerabilities = metrics.vulnerabilities;
      metricsToSave.hotspot = metrics.hotspot;
      metricsToSave.code_smells = metrics.code_smells;

      const data = await this._storage.save(metricsToSave);

      return {
        data,
        message: MessageValues.CREATE_SUCCESSFUL,
        ok: true,
      };
    } catch (error: unknown) {
      return generateMessageError(error);
    }
  };
}
