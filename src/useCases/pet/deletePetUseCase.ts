import type { Pet } from "../../entities/petEntity";
import { petRepository } from "../../repositories/petRepository";

export const deletePetUseCase = async (petId: number): Promise<Pet | null> => {
  return petRepository.delete(petId);
}
