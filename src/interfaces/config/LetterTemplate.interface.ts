import { BankDetailData } from "@interfaces/config/BankDetails.interface";

export interface LetterTemplate {
  content: string;
  type: number;
  name: string;
  bankDetails: string;
  extras?: string;
}

export interface LetterTemplateWithFullBankDetails
  extends Omit<LetterTemplate, "bankDetails"> {
  bankDetails: BankDetailData;
}

export interface LetterTemplateData extends LetterTemplate {
  _id: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

export interface LetterTemplateWithFullBankDetailsData
  extends LetterTemplateWithFullBankDetails {
  _id: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

export interface LetterTemplateResponse {
  statusCode: number;
  datas: LetterTemplateData;
}

export interface LetterTemplateWithFullBankDetailsResponse {
  statusCode: number;
  datas: LetterTemplateWithFullBankDetailsData;
}

export type LetterTemplateDisplayedKeys = "name" | "type";

export type FilteredLetterTemplateData = Partial<
  Pick<LetterTemplateData, LetterTemplateDisplayedKeys>
> & {
  [key: string]: any;
};
