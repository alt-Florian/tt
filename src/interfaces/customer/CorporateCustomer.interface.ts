export interface CorporateCustomerCreate {
  name: string;
  customer: boolean;
  refId: string;
  row_infos: {
    rSocial: number;
    siren: number;
    phone1?: string;
  };
  type?: string;
  email1?: string;
}
//add bigExpert sur l'update

export interface CorporateCustomerCreateData extends CorporateCustomerCreate {
  _id: string;
  createdAt: string;
  updatedAt: string;
  bigExpert: boolean;
  key: string;
}
export interface CorporateCustomerCreateResponse {
  statusCode: number;
  datas: CorporateCustomerCreateData;
}

export interface CorporateCustomerUpdate {
  name?: string;
  email1?: string;
  type?: string;
  refId?: string;
  infos?: string;
  key?: string;
  row_infos?: {
    phone1?: string;
    address1?: string;
    address2?: string;
    refAddress?: string;
    city1?: string;
    zip1?: string;
    rSocial?: number;
    registrationDate?: string;
    closureDate?: string;
    closingAccounts?: string;
    capital?: number;
    nafCode?: string;
    siren?: number;
    siret?: string[];
    courtService?: string;
    vat?: string;
    shareQty?: number | null;
    isPapperSource?: boolean;
    updatedPapper?: string;
  };
}

export interface CorporateCustomerUpdateData extends CorporateCustomerUpdate {
  _id: string;
  createdAt: string;
  updatedAt: string;
  bigExpert?: boolean;
  customer?: boolean;
}

export interface CorporateCustomerUpdateResponse {
  statusCode: number;
  datas: CorporateCustomerUpdateData;
}
