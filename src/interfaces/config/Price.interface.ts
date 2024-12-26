export interface Price {
  name: string;
  description: string;
  type: string;
  value: number;
  minFee?: number;
}

export interface PriceData extends Price {
  _id: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

export interface PriceResponse {
  statusCode: number;
  datas: PriceData;
}
export type PriceDisplayedKeys = "name" | "value" | "type";

export type FilteredPriceData = Partial<Pick<PriceData, PriceDisplayedKeys>> & {
  [key: string]: any;
};
