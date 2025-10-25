import type { Pet } from "../../entities/petEntity";
import { petRepository } from "../../repositories/petRepository";

export const updatePetUseCase = async (petId: number, newPetData: Pet): Promise<Pet | null> => {
  const exists = await petRepository.readById(petId);
  if (!exists) {
    return null;
  }
  const updatedStudent = { ...exists, newPetData};
  return petRepository.update(petId, updatedStudent);
}
