import type { Breed } from "../../entities/breedEntity";
import { breedRepository } from "../../repositories/breedRepository";

export const createBreedUseCase = async (breed: Breed): Promise<Breed | null> => {
  return breedRepository.create(breed);
}
