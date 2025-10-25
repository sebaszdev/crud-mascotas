import type { Pet } from "../../entities/petEntity";
import { petRepository } from "../../repositories/petRepository";

export const readPetUseCase = async (petId: number): Promise<Pet | null> => {
  return petRepository.readById(petId);
}
