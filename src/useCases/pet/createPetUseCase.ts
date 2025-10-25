import type { Pet } from "../../entities/petEntity";
import { petRepository } from "../../repositories/petRepository";

export const createPetUseCase = async (pet: Pet): Promise<Pet | null> => {
  return petRepository.create(pet);
}
