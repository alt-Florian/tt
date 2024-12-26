export interface BankDetail {
  iban: string;
  bank: string;
  bic: string;
  name?: string;
  description?: string;
}

export interface BankDetailData extends BankDetail {
  _id: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

export interface BankDetailResponse {
  statusCode: number;
  datas: BankDetailData;
}

export type BankDetailDisplayedKeys =
  | "name"
  | "description"
  | "bank"
  | "bic"
  | "iban";
export type FilteredBankDetailData = Partial<
  Pick<BankDetailData, BankDetailDisplayedKeys>
> & {
  [key: string]: any;
};
