import type { Pet } from "../../entities/petEntity";
import { petRepository } from "../../repositories/petRepository";

interface readAllParams {
  page?: number;
  pageSize?: number;
}

export const readAllPetsUseCase = async (params: readAllParams): Promise<Pet[] | null> => {
  return petRepository.readAll(params);
}
