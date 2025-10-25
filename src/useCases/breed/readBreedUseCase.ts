import type { Breed } from "../../entities/breedEntity";
import { breedRepository } from "../../repositories/breedRepository";

export const readBreedUsecase = async (breedId: number): Promise<Breed | null> => {
  return breedRepository.readById(breedId);
}
