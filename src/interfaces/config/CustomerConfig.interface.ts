export interface CustomerConfig {
  name: string;
  colorCode: string;
}

export interface CustomerConfigData extends CustomerConfig {
  _id: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

export interface CustomerConfigResponse {
  statusCode: number;
  datas: CustomerConfigData;
}
export type CustomerConfigDisplayedKeys = "name" | "colorCode";

export type FilteredCustomerConfigData = Partial<
  Pick<CustomerConfigData, CustomerConfigDisplayedKeys>
> & {
  [key: string]: any;
};
