export interface CorporateContactCreate {
  name: string;
  customer: boolean;
  row_infos: {
    rSocial: number;
    siren: number;
    phone1?: string;
  };
  refId?: string;
  type?: string;
  email1?: string;
}
//add bigExpert sur l'update

export interface CorporateContactCreateData extends CorporateContactCreate {
  _id: string;
  createdAt: string;
  updatedAt: string;
  bigExpert: boolean;
  key: string;
}
export interface CorporateContactCreateResponse {
  statusCode: number;
  datas: CorporateContactCreateData;
}
