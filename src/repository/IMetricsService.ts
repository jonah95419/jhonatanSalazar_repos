import { MetricsResponse } from "../../types/metrics_response";
import { Metrics } from "../entities/metrics.entity";
export interface IMetricsService {
  /**
   * @description Get all Metrics
   * @returns list all Metrics
   */
  getAllMetrics(): Promise<MetricsResponse>;

  /**
   * @description Create a Metrics Item
   * @param metrics new item, ommit id_tribu
   * @returns a boolean indicated the status
   */
  createMetrics(metrics: Metrics): Promise<MetricsResponse>;
}
