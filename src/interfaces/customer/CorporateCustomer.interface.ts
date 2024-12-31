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
  name?: string | null;
  email1?: string | null;
  type?: string;
  refId?: string | null;
  infos?: string | null;
  key?: string;
  row_infos?: {
    phone1?: string | null;
    address1?: string | null;
    address2?: string | null;
    refAddress?: string;
    city1?: string | null;
    zip1?: string | null;
    rSocial?: number | null;
    registrationDate?: string | null;
    closureDate?: string | null;
    closingAccounts?: string | null;
    capital?: number | null;
    nafCode?: string | null;
    siren?: number | null;
    siret?: string[];
    courtService?: string | null;
    vat?: string | null;
    shareQty?: number | null;
    isPapperSource?: boolean;
    updatedPapper?: string | null;
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
