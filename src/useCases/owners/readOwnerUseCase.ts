import type { Owner } from "../../entities/ownerEntity";
import { ownerRepository } from "../../repositories/ownerRepository";

export const readOwnerUseCase = async (ownerId: number): Promise<Owner | null> => {
  return ownerRepository.readById(ownerId);
}
