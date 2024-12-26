import { bankDetailApi } from "@api/config/BankDetail.api";
import {
  BankDetail,
  BankDetailResponse,
} from "@interfaces/config/BankDetails.interface";
import { ConfigResponse } from "@interfaces/config/ConfigList.interface";

import { DeleteResponse } from "@interfaces/config/DeleteResponse.interface";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

class BankDetailService {
  public createBankDetail(): UseMutationResult<
    BankDetailResponse,
    any,
    BankDetail
  > {
    return useMutation<BankDetailResponse, any, BankDetail>({
      mutationFn: (bankDetail) => bankDetailApi.createBankDetail(bankDetail),
    });
  }

  public getAllBankDetails(): UseQueryResult<ConfigResponse, any> {
    return useQuery<ConfigResponse, any>({
      queryKey: ["bankDetails"],
      queryFn: () => bankDetailApi.getAllBankDetails(),
      staleTime: 0,
    });
  }

  public getBankDetailById(
    id: string
  ): UseQueryResult<BankDetailResponse, any> {
    return useQuery<BankDetailResponse, any>({
      queryKey: [`bankDetail/${id}`],
      queryFn: () => bankDetailApi.getBankDetailById(id),
      staleTime: 0,
    });
  }

  public updateBankDetail(): UseMutationResult<
    BankDetailResponse,
    any,
    { id: string; newBankDetail: Partial<BankDetail> }
  > {
    return useMutation<
      BankDetailResponse,
      any,
      { id: string; newBankDetail: Partial<BankDetail> }
    >({
      mutationFn: ({ id, newBankDetail }) =>
        bankDetailApi.updateBankDetail(id, newBankDetail),
    });
  }

  public deleteBankDetail(): UseMutationResult<DeleteResponse, any, string> {
    return useMutation<DeleteResponse, any, string>({
      mutationFn: (id) => bankDetailApi.deleteBankDetail(id),
    });
  }
}

export const bankDetailService = new BankDetailService();
