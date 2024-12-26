import {
  BankDetailData,
  FilteredBankDetailData,
} from "@interfaces/config/BankDetails.interface";
import {
  BlockData,
  FilteredBlockData,
} from "@interfaces/config/Block.interface";

import {
  FilteredLetterTemplateData,
  LetterTemplateData,
} from "@interfaces/config/LetterTemplate.interface";
import {
  FilteredNatureData,
  NatureData,
} from "@interfaces/config/Nature.interface";
import {
  FilteredPriceData,
  PriceData,
} from "@interfaces/config/Price.interface";
import { FilteredTaskData, TaskData } from "@interfaces/config/Task.interface";
import {
  CustomerConfigData,
  FilteredCustomerConfigData,
} from "./CustomerConfig.interface";

export interface Paginate {
  count: number;
  skip: number;
  take: number;
  order: any;
}

export interface ConfigResponse {
  paginate: Paginate;
  statusCode: number;
  datas:
    | BankDetailData[]
    | LetterTemplateData[]
    | BlockData[]
    | NatureData[]
    | PriceData[]
    | CustomerConfigData[]
    | TaskData[];
}

export interface FilteredConfigResponse {
  paginate: Paginate;
  statusCode: number;
  filteredDatas:
    | FilteredBankDetailData[]
    | FilteredLetterTemplateData[]
    | FilteredBlockData[]
    | FilteredNatureData[]
    | FilteredPriceData[]
    | FilteredCustomerConfigData[]
    | FilteredTaskData[];
}
