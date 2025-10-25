import type { Breed } from "../../entities/breedEntity";
import { breedRepository } from "../../repositories/breedRepository";

interface readAllParams {
  page?: number;
  pageSize?: number;
}

export const readAllBreedsUseCase = async (params: readAllParams): Promise<Breed[] | null> => {
  return breedRepository.readAll(params);
}
