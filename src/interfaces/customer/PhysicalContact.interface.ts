export interface PhysicalContactCreate {
  name: string;
  customer: boolean;
  row_infos: {
    firstname: string;
    civilities: number;
    phone1?: string;
  };
  type?: string;
  email1?: string;
}

//add bigExpert sur l'update

export interface PhysicalContactCreateData extends PhysicalContactCreate {
  _id: string;
  bigExpert: boolean;
  createdAt: string;
  updatedAt: string;
  key: string;
}
export interface PhysicalContactCreateResponse {
  statusCode: number;
  datas: PhysicalContactCreateData;
}
