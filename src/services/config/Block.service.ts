import { blockApi } from "@api/config/Block.api";
import {
  Block,
  BlockCreateResponse,
  BlockGetByIDResponse,
  BlockUpdateResponse,
} from "@interfaces/config/Block.interface";
import { DeleteResponse } from "@interfaces/config/DeleteResponse.interface";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

class BlockService {
  public createBlock(): UseMutationResult<BlockCreateResponse, any, Block> {
    return useMutation<BlockCreateResponse, any, Block>({
      mutationFn: (block: Block) => blockApi.createBlock(block),
    });
  }

  public getBlockById(id: string): UseQueryResult<BlockGetByIDResponse, any> {
    return useQuery<BlockGetByIDResponse, any>({
      queryKey: [`block/${id}`],
      queryFn: () => blockApi.getBlockById(id),
      staleTime: 0,
    });
  }

  public updateBlock(): UseMutationResult<
    BlockUpdateResponse,
    any,
    { id: string; newBlock: Partial<Block> }
  > {
    return useMutation<
      BlockUpdateResponse,
      any,
      { id: string; newBlock: Partial<Block> }
    >({
      mutationFn: ({ id, newBlock }) => blockApi.updateBlock(id, newBlock),
    });
  }

  public deleteBlock(): UseMutationResult<DeleteResponse, any, string> {
    return useMutation<DeleteResponse, any, string>({
      mutationFn: (id: string) => blockApi.deleteBlock(id),
    });
  }
}

export const blockService = new BlockService();
