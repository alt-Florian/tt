import { useApi } from "@hooks/api/useApi";
import { DeleteResponse } from "@interfaces/config/DeleteResponse.interface";
import {
  CorporateContactCreate,
  CorporateContactCreateResponse,
} from "@interfaces/customer/CorporateContact.interface";
import {
  CorporateCustomerCreate,
  CorporateCustomerCreateResponse,
  CorporateCustomerUpdate,
  CorporateCustomerUpdateResponse,
} from "@interfaces/customer/CorporateCustomer.interface";
import {
  CorporateWithPappersContact,
  CorporateWithPappersCustomer,
  CorporateWithPappersResponse,
} from "@interfaces/customer/CorporateWithPappers.interface";
import {
  BecomeCustomer,
  BecomeCustomerResponse,
  BigExpert,
  CorporateCustomerProfileResponse,
  CustomerEnterpriseResponse,
  CustomerForSelectResponse,
  PhysicalCustomerProfileResponse,
} from "@interfaces/customer/CustomerResponses.interface";
import {
  PhysicalContactCreate,
  PhysicalContactCreateResponse,
} from "@interfaces/customer/PhysicalContact.interface";

import {
  PhysicalCustomerCreate,
  PhysicalCustomerCreateResponse,
  PhysicalCustomerUpdate,
  PhysicalCustomerUpdateResponse,
} from "@interfaces/customer/PhysicalCustomer.interface";

const api = useApi();

class CustomerApi {
  public async createPhysicalCustomer(
    physicalCustomer: PhysicalCustomerCreate
  ): Promise<PhysicalCustomerCreateResponse> {
    try {
      const { data } = await api.post(
        `crm/customer/physical`,
        physicalCustomer
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async createPhysicalContact(
    physicalContact: PhysicalContactCreate
  ): Promise<PhysicalContactCreateResponse> {
    try {
      const { data } = await api.post(`crm/customer/physical`, physicalContact);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async createCorporateCustomer(
    corporateCustomer: CorporateCustomerCreate
  ): Promise<CorporateCustomerCreateResponse> {
    try {
      const { data } = await api.post(
        `crm/customer/corporate`,
        corporateCustomer
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async createCorporateContact(
    corporateContact: CorporateContactCreate
  ): Promise<CorporateContactCreateResponse> {
    try {
      const { data } = await api.post(
        `crm/customer/corporate`,
        corporateContact
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async createCorporateCustomerWithPappers(
    body: CorporateWithPappersCustomer,
    siren: string
  ): Promise<CorporateWithPappersResponse> {
    try {
      const { data } = await api.post(
        `crm/customer/corporate/pappers?siren=${siren}`,
        body
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async createCorporateContactWithPappers(
    body: CorporateWithPappersContact,
    siren: string
  ): Promise<CorporateWithPappersResponse> {
    try {
      const { data } = await api.post(
        `crm/customer/corporate/pappers?siren=${siren}`,
        body
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getAllCustomerForSelect(): Promise<CustomerForSelectResponse> {
    try {
      const { data } = await api.get(`/crm/customer/physical/search/mat`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getPhysicalCustomerProfile(
    id: string
  ): Promise<PhysicalCustomerProfileResponse> {
    try {
      const { data } = await api.get(`/crm/customer/physical/profil/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getPhysicalCustomerEnterprise(
    id: string
  ): Promise<CustomerEnterpriseResponse> {
    try {
      const { data } = await api.get(`/crm/customer/physical/enterprise/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getCorporateCustomerProfile(
    id: string
  ): Promise<CorporateCustomerProfileResponse> {
    try {
      const { data } = await api.get(`/crm/customer/corporate/profil/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getCorporateCustomerEnterprise(
    id: string
  ): Promise<CustomerEnterpriseResponse> {
    try {
      const { data } = await api.get(
        `/crm/customer/corporate/enterprise/${id}`
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getCSV(id: string): Promise<string> {
    try {
      const { data } = await api.get(`/crm/customer/csv/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async becomeCustomer(
    id: string,
    body: Partial<BecomeCustomer>
  ): Promise<BecomeCustomerResponse> {
    try {
      const { data } = await api.post(`/crm/customer/status/${id}`, body);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async bigExpert(
    id: string,
    body: BigExpert
  ): Promise<BecomeCustomerResponse> {
    try {
      const { data } = await api.post(`/crm/customer/bigexpert/${id}`, body);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async updatePhysicalCustomer(
    id: string,
    body: PhysicalCustomerUpdate
  ): Promise<PhysicalCustomerUpdateResponse> {
    try {
      const { data } = await api.post(`/crm/customer/physical/${id}`, body);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async updateCorporateCustomer(
    id: string,
    body: CorporateCustomerUpdate
  ): Promise<CorporateCustomerUpdateResponse> {
    try {
      const { data } = await api.post(`/crm/customer/corporate/${id}`, body);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async deletePhysicalCustomer(id: string): Promise<DeleteResponse> {
    try {
      const { data } = await api.delete(`/crm/customer/physical/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  }
  public async deleteCorporateCustomer(id: string): Promise<DeleteResponse> {
    try {
      const { data } = await api.delete(`/crm/customer/corporate/${id}`);
      return data;
    }
    catch (error) {
      throw error;
    }
  }

  async search(term: string) {
    try {
      const { data } = await api.get(`/crm/customer/search/${term}?customer=true&limit=0`);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export const customerApi = new CustomerApi();
