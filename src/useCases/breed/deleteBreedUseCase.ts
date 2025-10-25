import type { Breed } from "../../entities/breedEntity";
import { breedRepository } from "../../repositories/breedRepository";

export const deleteBreedUseCase = async (breedId: number): Promise<Breed | null> => {
  return breedRepository.delete(breedId);
}
