export interface Patrimony {
  year: string;
  //corporate
  equity?: number;
  ca?: number;
  netResult?: number;
  netAsset?: number;
  effectif?: number;
  VAT?: boolean | null;
  corporateTax?: boolean | null;
  //physical
  fiscalTax?: number;
  payedTax?: number;
  socialTax?: number;
}

export interface PatrimonyResponse extends Patrimony {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
export interface CustomersPatrimonyDatas extends Patrimony {
  _id: string;
  datas: PatrimonyResponse[];
  refCustomer: string;
  createdAt: string;
  updatedAt: string;
}
export interface CustomersPatrimonyResponse {
  statusCode: number;
  datas: CustomersPatrimonyDatas;
}
