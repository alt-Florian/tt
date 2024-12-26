export interface Patrimony {
  year: string;
  //corporate
  equity?: number;
  ca?: number;
  netResult?: number;
  netAsset?: number;
  effectif?: number;
  VAT?: boolean;
  corporateTax?: boolean;
  //physical
  fiscalTax?: number;
  payedTax?: number;
  socialTax?: number;
}

export interface PatrimonyDatas extends Patrimony {
  _id: string;
  datas: Patrimony[];
  refCustomer: string;
  createdAt: string;
  updatedAt: string;
}
export interface PatrimonyResponse {
  statusCode: number;
  datas: PatrimonyDatas;
}
