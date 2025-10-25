import type { Owner } from "../../entities/ownerEntity";
import { ownerRepository } from "../../repositories/ownerRepository";

export const deleteOwnerUseCase = async (ownerId: number): Promise<Owner | null> => {
  return ownerRepository.delete(ownerId);
}
