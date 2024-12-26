// CustomerList for Select in add form
export interface CustomerForSelect {
  _id: string;
  row_infos: {
    firstname: string;
  };
  name: string;
}
export interface CustomerForSelectResponse {
  status: number;
  datas: CustomerForSelect[];
}

// Physical Customer Profile
interface RefId {
  _id: string;
  row_infos: {
    phone1?: string; // phone/civility/firstname = personne physique
    civilities?: number;
    firstname?: string;
    rSocial?: number; // rSocial = personne morale
  };
  email1?: string;
  name: string;
  type: string;
  customer: boolean;
}
export interface Relation {
  relation: string;
  rType?: number; //si relation === "1"
  rFunction?: number; // si relation === "2"
  refId: RefId;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
export type RowInfoPhysicalResponse = {
  refAddress?: string | null;
  civilities?: number;
  firstname?: string;
  phone1?: string;
  birthName?: string;
  birthday?: string;
  birthLocation?: string;
  nationality?: string;
  nin?: number;
  civilStats?: number;
  marriageSettlement?: number;
  unionDate?: string;
  unionPlace?: string;
  address1?: string;
  city1?: string;
  zip1?: number;
  email2?: string;
  phone2?: string;
  address2?: string;
  city2?: string;
  zip2?: string;
  company?: string;
  dieDate?: string;
};

interface RefType {
  type: {
    _id: string;
    name: string;
    colorCode: string;
  };
  customerId: { id: string; name: string };
}

interface PhysicalCustomerDetails {
  _id: string;
  row_infos: RowInfoPhysicalResponse;
  refType?: RefType;
  type: string;
  bigExpert: boolean;
  customer: boolean;
  email1: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  key: string;
  infos: string;
}

export interface PhysicalCustomerProfileResponse {
  statusCode: number;
  datas: {
    details: PhysicalCustomerDetails;
    relations?: Relation[];
    patrimony?: {
      payedTax: number | null;
      socialTax: number | null;
      fiscalTax: number | null;
      year: string;
    }[];
    possessions?: {
      actif: number;
      passif: number;
    };
  };
}

// Physical Customer Enterprise
interface Shares {
  owned: number;
  category: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Shareholder {
  typeLink: string;
  shares: Shares[];
  refId: RefId;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerEnterpriseResponse {
  statusCode: number;
  datas: {
    _id: string;
    shareholders?: Shareholder[];
    directors?: {
      typeLink: string;
      rFunction: number;
      refId: RefId;
      _id: string;
      createdAt: string;
      updatedAt: string;
    }[];
    createdAt: string;
    updatedAt: string;
  };
}

// Corporate Customer Profile
export type RowInfoCorporateResponse = {
  rSocial?: number;
  registrationDate?: string;
  closureDate?: string;
  closingAccounts?: string;
  capital?: number;
  nafCode?: string;
  siren?: string;
  siret?: string[];
  courtService?: string;
  vat?: string;
  shareQty?: number;
  isPapperSource?: boolean;
  updatedPapper?: string;
  phone1?: string;
  address1?: string;
  zip1?: string;
  city1?: string;
  address2?: string;
  refAddress?: string;
};

interface CorporateCustomerDetails {
  _id: string;
  name: string;
  email1: string;
  customer: boolean;
  bigExpert: boolean;
  type: string;
  row_infos: RowInfoCorporateResponse;
  refType?: RefType;
  refId?: string;
  createdAt: string;
  updatedAt: string;
  key: string;
  infos: string;
}
export interface CorporateCustomerProfileResponse {
  statusCode: number;
  datas: {
    details: CorporateCustomerDetails;
    relations?: Relation[];
    patrimony?: {
      equity: number | null;
      ca: number | null;
      netResult: number | null;
      netAsset: number | null;
      effectif: number;
      VAT: boolean;
      corporateTax: boolean;
      year: string;
    }[];
    possessions?: {
      actif: number;
      passif: number;
    };
  };
}

export interface BecomeCustomer {
  email1?: string;
  refId?: string;
}
interface CustomerDetails {
  _id: string;
  name: string;
  email1: string;
  customer: boolean;
  bigExpert: boolean;
  type: string;
  row_infos: RowInfoCorporateResponse & RowInfoPhysicalResponse;
  refType?: RefType;
  createdAt: string;
  updatedAt: string;
  key: string;
  infos: string;
}
export interface BecomeCustomerResponse {
  statusCode: number;
  datas: CustomerDetails;
}
