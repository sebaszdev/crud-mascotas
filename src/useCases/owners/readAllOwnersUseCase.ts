import type { Owner } from "../../entities/ownerEntity";
import { ownerRepository } from "../../repositories/ownerRepository";

interface readAllParams {
  page?: number;
  pageSize?: number;
}

export const readAllOwnersUseCase = async (params: readAllParams): Promise<Owner[] | null> => {
  return ownerRepository.readAll(params);
}
