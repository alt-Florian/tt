export interface PhysicalCustomerCreate {
  name: string;
  email1: string;
  customer: boolean;
  row_infos: {
    firstname: string;
    civilities: number;
    phone1?: string;
  };
  type?: string;
}
export interface PhysicalCustomerData extends PhysicalCustomerCreate {
  _id: string;
  bigExpert: boolean;
  createdAt: string;
  updatedAt: string;
  key: string;
}
export interface PhysicalCustomerCreateResponse {
  statusCode: number;
  datas: PhysicalCustomerData;
}

export interface PhysicalCustomerUpdate {
  name?: string | null;
  email1?: string | null;
  type?: string;
  infos?: string | null;
  row_infos?: {
    phone1?: string | null;
    refAddress?: string;
    address1?: string | null;
    city1?: string | null;
    zip1?: string | null;
    firstname?: string | null;
    birthName?: string | null;
    civilities?: number;
    birthday?: string | null;
    birthLocation?: string | null;
    nationality?: string | null;
    nin?: number | null;
    civilStats?: number | null;
    marriageSettlement?: number | null;
    unionDate?: string | null;
    dieDate?: string | null;
    unionPlace?: string | null;
    minority?: boolean | null;
    die?: boolean | null;
    email2?: string | null;
    phone2?: string | null;
    address2?: string | null;
    city2?: string | null;
    zip2?: string | null;
    company?: string | null;
  };
}

export interface PhysicalCustomerUpdateData extends PhysicalCustomerUpdate {
  _id: string;
  createdAt: string;
  updatedAt: string;
  bigExpert?: boolean;
  customer?: boolean;
  key?: string;
}

export interface PhysicalCustomerUpdateResponse {
  statusCode: number;
  datas: PhysicalCustomerUpdateData;
}
