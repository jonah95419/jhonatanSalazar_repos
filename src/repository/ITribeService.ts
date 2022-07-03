import { TribeResponse } from 'types/tribe_response';
import { Tribe } from '../entities/tribe.entity';
export interface ITribeService {
  /**
   * @description Get all Tribes
   * @param id_tribe id Tribe with relationship ManyToOne Repository/Tribe
   * @returns list all Tribes
   */
  getAllTribesById(id_tribe: number): Promise<TribeResponse>;

  /**
   * @description Get a Tribe by id
   * @param id_tribe id Tribe with relationship ManyToOne Repository/Tribe
   * @returns get item Tribe
   */
  getItemTribeById(id_tribe: number): Promise<TribeResponse>;

  /**
   * @description Create a Tribu Item
   * @param tribu new item, ommit id_tribu
   * @returns a boolean indicated the status
   */
  createTribe(tribu: Tribe): Promise<TribeResponse>;

  /**
   * @description Update a Tribu Item
   * @param tribu item to update
   * @returns a boolean indicated the status
   */
  updateTribe(tribu: Tribe): Promise<TribeResponse>;
}
