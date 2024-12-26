import { NatureWithOnlyTemplateIDsData } from "@interfaces/config/Nature.interface";
import { PriceData } from "@interfaces/config/Price.interface";
import { TaskData } from "@interfaces/config/Task.interface";

export interface Block {
  name: string;
  description: string;
  prices: string[];
  natures: string[];
  tasks?: string[];
}
export interface BlockData extends Block {
  _id: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

export type BlockDisplayedKeys = "name";
export type FilteredBlockData = Partial<Pick<BlockData, BlockDisplayedKeys>> & {
  [key: string]: any;
};
export interface BlockResponse {
  statusCode: number;
  datas: BlockData;
}

export interface BlockWithExtendedNatures {
  name: string;
  description: string;
  prices: string[];
  natures: NatureWithOnlyTemplateIDsData[];
  tasks?: string[];
}
export interface BlockWithExtendedNaturesData extends BlockWithExtendedNatures {
  _id: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

export interface BlockCreateResponse {
  statusCode: number;
  datas: BlockWithExtendedNaturesData;
}

export interface BlockWithExtendedNaturesAndTasks {
  name: string;
  description: string;
  prices: string[];
  natures: NatureWithOnlyTemplateIDsData[];
  tasks?: TaskData[];
}
export interface BlockWithExtendedNaturesAndTasksData
  extends BlockWithExtendedNaturesAndTasks {
  _id: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

export interface BlockUpdateResponse {
  statusCode: number;
  datas: BlockWithExtendedNaturesAndTasksData;
}

export interface BlockFullExtended {
  name: string;
  description: string;
  prices: PriceData[];
  natures: NatureWithOnlyTemplateIDsData[];
  tasks?: TaskData[];
}
export interface BlockFullExtendedData extends BlockFullExtended {
  _id: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

export interface BlockGetByIDResponse {
  statusCode: number;
  datas: BlockFullExtendedData;
}
