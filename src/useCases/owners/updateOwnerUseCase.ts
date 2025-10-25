import type { Owner } from "../../entities/ownerEntity";
import { ownerRepository } from "../../repositories/ownerRepository";

export const updateOwnerUseCase = async (ownerId: number, newOwnerData: Owner): Promise<Owner | null> => {
  const exists = await ownerRepository.readById(ownerId);
  if (!exists) {
    return null;
  }
  const updatedOwner = { ...exists, newOwnerData};
  return ownerRepository.update(ownerId, updatedOwner);
}
