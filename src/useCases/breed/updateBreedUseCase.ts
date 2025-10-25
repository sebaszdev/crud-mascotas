import type { Breed } from "../../entities/breedEntity";
import { breedRepository } from "../../repositories/breedRepository";

export const updateBreedUseCase = async (breedId: number, newBreedData: Breed): Promise<Breed | null> => {
  const exists = await breedRepository.readById(breedId);
  if (!exists) {
    return null;
  }
  const updatedBreed = { ...exists, newBreedData};
  return breedRepository.update(breedId, updatedBreed);
}
