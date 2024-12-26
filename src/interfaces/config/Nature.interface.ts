import { LetterTemplateData } from "@interfaces/config/LetterTemplate.interface";

export interface Nature {
  name: string;
  templates: string[];
  alertDelay?: number;
  description?: string;
}

export interface NatureData extends Omit<Nature, "templates"> {
  _id: string;
  templates: Pick<LetterTemplateData, "_id" | "name">[];
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

export interface NatureWithOnlyTemplateIDsData extends Nature {
  _id: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

export interface NatureWithFullTemplateData extends Omit<Nature, "templates"> {
  _id: string;
  templates: LetterTemplateData[];
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

export interface NatureResponse {
  statusCode: number;
  datas: NatureData;
}

export interface NatureWithFullTemplateResponse {
  statusCode: number;
  datas: NatureWithFullTemplateData;
}

export type NatureDisplayedKeys = "name" | "alertDelay" | "templates";

export type FilteredNatureData = Partial<
  Pick<NatureData, NatureDisplayedKeys>
> & {
  [key: string]: any;
};
