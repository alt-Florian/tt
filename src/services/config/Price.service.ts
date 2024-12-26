import { priceApi } from "@api/config/Price.api";
import { ConfigResponse } from "@interfaces/config/ConfigList.interface";
import { DeleteResponse } from "@interfaces/config/DeleteResponse.interface";
import { Price, PriceResponse } from "@interfaces/config/Price.interface";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

class PriceService {
  public createPrice(): UseMutationResult<PriceResponse, any, Price> {
    return useMutation<PriceResponse, any, Price>({
      mutationFn: (price: Price) => priceApi.createPrice(price),
    });
  }

  public getAllPrices(): UseQueryResult<ConfigResponse, any> {
    return useQuery<ConfigResponse, any>({
      queryKey: ["prices"],
      queryFn: () => priceApi.getAllPrices(),
      staleTime: 0,
    });
  }

  public getPriceById(id: string): UseQueryResult<PriceResponse, any> {
    return useQuery<PriceResponse, any>({
      queryKey: [`price/${id}`],
      queryFn: () => priceApi.getPriceById(id),
      staleTime: 0,
    });
  }

  public updatePrice(): UseMutationResult<
    PriceResponse,
    any,
    { id: string; newPrice: Partial<Price> }
  > {
    return useMutation<
      PriceResponse,
      any,
      { id: string; newPrice: Partial<Price> }
    >({
      mutationFn: ({ id, newPrice }) => priceApi.updatePrice(id, newPrice),
    });
  }

  public deletePrice(): UseMutationResult<DeleteResponse, any, string> {
    return useMutation<DeleteResponse, any, string>({
      mutationFn: (id: string) => priceApi.deletePrice(id),
    });
  }
}

export const priceService = new PriceService();
