import { letterTemplateApi } from "@api/config/LetterTemplate.api";
import { ConfigResponse } from "@interfaces/config/ConfigList.interface";
import { DeleteResponse } from "@interfaces/config/DeleteResponse.interface";
import {
  LetterTemplate,
  LetterTemplateResponse,
  LetterTemplateWithFullBankDetailsResponse,
} from "@interfaces/config/LetterTemplate.interface";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

class LetterTemplateService {
  public createLetterTemplate(): UseMutationResult<
    LetterTemplateResponse,
    any,
    LetterTemplate
  > {
    return useMutation<LetterTemplateResponse, any, LetterTemplate>({
      mutationFn: (letterTemplate: LetterTemplate) =>
        letterTemplateApi.createLetterTemplate(letterTemplate),
    });
  }

  public getAllLetterTemplates(): UseQueryResult<ConfigResponse, any> {
    return useQuery<ConfigResponse, any>({
      queryKey: ["letterTemplates"],
      queryFn: () => letterTemplateApi.getAllLetterTemplates(),
      staleTime: 0,
    });
  }

  public getLetterTemplateById(
    id: string
  ): UseQueryResult<LetterTemplateWithFullBankDetailsResponse, any> {
    return useQuery<LetterTemplateWithFullBankDetailsResponse, any>({
      queryKey: [`letterTemplate/${id}`],
      queryFn: () => letterTemplateApi.getLetterTemplateById(id),
      staleTime: 0,
    });
  }

  public updateLetterTemplate(): UseMutationResult<
    LetterTemplateResponse,
    any,
    { id: string; newLetterTemplate: Partial<LetterTemplate> }
  > {
    return useMutation<
      LetterTemplateResponse,
      any,
      { id: string; newLetterTemplate: Partial<LetterTemplate> }
    >({
      mutationFn: ({ id, newLetterTemplate }) =>
        letterTemplateApi.updateLetterTemplate(id, newLetterTemplate),
    });
  }

  public deleteLetterTemplate(): UseMutationResult<
    DeleteResponse,
    any,
    string
  > {
    return useMutation<DeleteResponse, any, string>({
      mutationFn: (id: string) => letterTemplateApi.deleteLetterTemplate(id),
    });
  }
}

export const letterTemplateService = new LetterTemplateService();
