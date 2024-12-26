export interface Possession {
  type: string;
  value: number;
  category: number;
  name: string;
}

export interface Asset extends Possession {
  _id: string;
}
export interface PossessionsResponse {
  statusCode: number;
  datas: {
    _id?: string;
    assets?: Asset[];
    refCustomer?: string;
    createdAt?: string;
    updatedAt?: string;
  };
}
