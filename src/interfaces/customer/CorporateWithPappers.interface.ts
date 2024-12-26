export interface CorporateWithPappersCustomer {
  customer: boolean;
  refId: string;
}
export interface CorporateWithPappersContact {
  customer: boolean;
  refId?: string;
}

export interface CorporateWithPappersData {
  name: string;
  customer: boolean;
  bigExpert: boolean;
  type: string;
  refId: string;
  row_infos: {
    rSocial: number;
    registrationDate: string;
    closingAccounts: string;
    capital: number;
    nafCode: string;
    siren: string;
    siret: string[];
    courtService: string;
    isPapperSource: boolean;
    updatedPapper: string;
    address1: string;
    address2: string | null;
    zip1: string;
    city1: string;
    vat: string;
  };
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface CorporateWithPappersResponse {
  statusCode: number;
  datas: CorporateWithPappersData;
}
