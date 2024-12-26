import { natureApi } from "@api/config/Nature.api";
import { ConfigResponse } from "@interfaces/config/ConfigList.interface";
import { DeleteResponse } from "@interfaces/config/DeleteResponse.interface";
import {
  Nature,
  NatureWithFullTemplateResponse,
} from "@interfaces/config/Nature.interface";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

class NatureService {
  public createNature(): UseMutationResult<
    NatureWithFullTemplateResponse,
    any,
    Nature
  > {
    return useMutation<NatureWithFullTemplateResponse, any, Nature>({
      mutationFn: (nature: Nature) => natureApi.createNature(nature),
    });
  }

  public getAllNatures(): UseQueryResult<ConfigResponse, any> {
    return useQuery<ConfigResponse, any>({
      queryKey: ["natures"],
      queryFn: () => natureApi.getAllNatures(),
      staleTime: 0,
    });
  }

  public getNatureById(
    id: string
  ): UseQueryResult<NatureWithFullTemplateResponse, any> {
    return useQuery<NatureWithFullTemplateResponse, any>({
      queryKey: [`nature/${id}`],
      queryFn: () => natureApi.getNatureById(id),
      staleTime: 0,
    });
  }

  public updateNature(): UseMutationResult<
    NatureWithFullTemplateResponse,
    any,
    { id: string; newNature: Partial<Nature> }
  > {
    return useMutation<
      NatureWithFullTemplateResponse,
      any,
      { id: string; newNature: Partial<Nature> }
    >({
      mutationFn: ({ id, newNature }) => natureApi.updateNature(id, newNature),
    });
  }

  public deleteNature(): UseMutationResult<DeleteResponse, any, string> {
    return useMutation<DeleteResponse, any, string>({
      mutationFn: (id: string) => natureApi.deleteNature(id),
    });
  }
}

export const natureService = new NatureService();
