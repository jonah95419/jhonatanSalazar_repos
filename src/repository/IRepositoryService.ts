import { RepositoryResponse } from "../../types/repository_response";
import { Repository } from "../entities/repository.entity";
export interface IRepositoryService {
  /**
   * @description Get all Repositories by id_tribe
   * @param id_tribe id Tribe with relationship OneToMany Tribe/Repository
   * @returns list Repositories
   */
  getAllRepositories(id_tribe: number): Promise<RepositoryResponse>;

  /**
   * @description Get ItemRepository by id_repository
   * @param id_repository id Repository with relationship OneToOne Repository/Metric
   * @returns get item Repository
   */
  getItemRepositoryById(id_repository: number): Promise<RepositoryResponse>;

  /**
   * @description Create a Repository Item
   * @param repository new item, ommit id_tribu
   * @returns item created
   */
  createRepository(repository: Repository): Promise<RepositoryResponse>;

  /**
   * @description Update a Repository Item
   * @param repository item to update
   * @returns item updated
   */
  updateRepository(repository: Repository): Promise<RepositoryResponse>;

  /**
   * @description Generate file CSV
   * @param id_tribe id Tribe to generate report
   * @returns report to Repository
   */
  reportRepositoryFile(id_tribe: number): Promise<object>;
}
