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
  name?: string;
  email1?: string;
  type?: string;
  infos?: string;
  row_infos?: {
    phone1?: string;
    refAddress?: string;
    address1?: string;
    city1?: string;
    zip1?: string;
    firstname?: string;
    birthName?: string;
    civilities?: number;
    birthday?: string;
    birthLocation?: string;
    nationality?: string;
    nin?: number;
    civilStats?: number;
    marriageSettlement?: number;
    unionDate?: string;
    dieDate?: string;
    unionPlace?: string;
    minority?: boolean;
    die?: boolean;
    email2?: string;
    phone2?: string;
    address2?: string;
    city2?: string;
    zip2?: string;
    company?: string;
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
