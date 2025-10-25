import type { Owner } from "../../entities/ownerEntity";
import { ownerRepository } from "../../repositories/ownerRepository";

export const createPetUseCase = async (owner: Owner): Promise<Owner | null> => {
  return ownerRepository.create(owner);
}
