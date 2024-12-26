import { customerApi } from "@api/customer/Customer.api";
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
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

class CustomerService {
  public createPhysicalCustomer(): UseMutationResult<
    PhysicalCustomerCreateResponse,
    any,
    PhysicalCustomerCreate
  > {
    return useMutation<
      PhysicalCustomerCreateResponse,
      any,
      PhysicalCustomerCreate
    >({
      mutationFn: (newCustomer: PhysicalCustomerCreate) =>
        customerApi.createPhysicalCustomer(newCustomer),
    });
  }

  public createPhysicalContact(): UseMutationResult<
    PhysicalContactCreateResponse,
    any,
    PhysicalContactCreate
  > {
    return useMutation<
      PhysicalContactCreateResponse,
      any,
      PhysicalContactCreate
    >({
      mutationFn: (newContact: PhysicalContactCreate) =>
        customerApi.createPhysicalContact(newContact),
    });
  }

  public createCorporateCustomer(): UseMutationResult<
    CorporateCustomerCreateResponse,
    any,
    CorporateCustomerCreate
  > {
    return useMutation<
      CorporateCustomerCreateResponse,
      any,
      CorporateCustomerCreate
    >({
      mutationFn: (newCorporate: CorporateCustomerCreate) =>
        customerApi.createCorporateCustomer(newCorporate),
    });
  }

  public createCorporateContact(): UseMutationResult<
    CorporateContactCreateResponse,
    any,
    CorporateContactCreate
  > {
    return useMutation<
      CorporateContactCreateResponse,
      any,
      CorporateContactCreate
    >({
      mutationFn: (newContact: CorporateContactCreate) =>
        customerApi.createCorporateContact(newContact),
    });
  }

  public createCorporateCustomerWithPappers(): UseMutationResult<
    CorporateWithPappersResponse,
    any,
    {
      body: CorporateWithPappersCustomer;
      siren: string;
    }
  > {
    return useMutation<
      CorporateWithPappersResponse,
      any,
      {
        body: CorporateWithPappersCustomer;
        siren: string;
      }
    >({
      mutationFn: ({
        body,
        siren,
      }: {
        body: CorporateWithPappersCustomer;
        siren: string;
      }) => customerApi.createCorporateCustomerWithPappers(body, siren),
    });
  }

  public createCorporateContactWithPappers(): UseMutationResult<
    CorporateWithPappersResponse,
    any,
    {
      body: CorporateWithPappersContact;
      siren: string;
    }
  > {
    return useMutation<
      CorporateWithPappersResponse,
      any,
      {
        body: CorporateWithPappersContact;
        siren: string;
      }
    >({
      mutationFn: ({
        body,
        siren,
      }: {
        body: CorporateWithPappersContact;
        siren: string;
      }) => customerApi.createCorporateContactWithPappers(body, siren),
    });
  }

  public getAllCustomersForSelect(): UseQueryResult<
    CustomerForSelectResponse,
    any
  > {
    return useQuery<CustomerForSelectResponse, any>({
      queryKey: ["customersForSelect"],
      queryFn: () => customerApi.getAllCustomerForSelect(),
      staleTime: 0,
    });
  }

  public getPhysicalCustomerProfile(
    id: string
  ): UseQueryResult<PhysicalCustomerProfileResponse, any> {
    return useQuery<PhysicalCustomerProfileResponse, any>({
      queryKey: [`physicalCustomerProfile${id}`],
      queryFn: () => customerApi.getPhysicalCustomerProfile(id),
      staleTime: 0,
    });
  }

  public getPhysicalCustomerEnterprise(
    id: string
  ): UseQueryResult<CustomerEnterpriseResponse, any> {
    return useQuery<CustomerEnterpriseResponse, any>({
      queryKey: [`physicalCustomerEnterprise${id}`],
      queryFn: () => customerApi.getPhysicalCustomerEnterprise(id),
      staleTime: 0,
    });
  }

  public getCorporateCustomerProfile(
    id: string
  ): UseQueryResult<CorporateCustomerProfileResponse, any> {
    return useQuery<CorporateCustomerProfileResponse, any>({
      queryKey: [`corporateCustomerProfile${id}`],
      queryFn: () => customerApi.getCorporateCustomerProfile(id),
      staleTime: 0,
    });
  }

  public getCorporateCustomerEnterprise(
    id: string
  ): UseQueryResult<CustomerEnterpriseResponse, any> {
    return useQuery<CustomerEnterpriseResponse, any>({
      queryKey: [`corporateCustomerEnterprise${id}`],
      queryFn: () => customerApi.getCorporateCustomerEnterprise(id),
      staleTime: 0,
    });
  }

  public getCSV(id: string): UseQueryResult<string, any> {
    return useQuery<string, any>({
      queryKey: [`csv-${id}`],
      queryFn: () => customerApi.getCSV(id),
      staleTime: 0,
    });
  }

  public becomeCustomer(): UseMutationResult<
    BecomeCustomerResponse,
    any,
    { id: string; body: Partial<BecomeCustomer> }
  > {
    return useMutation<
      BecomeCustomerResponse,
      any,
      { id: string; body: Partial<BecomeCustomer> }
    >({
      mutationFn: ({ id, body }) => customerApi.becomeCustomer(id, body),
    });
  }

  public updatePhysicalCustomer(): UseMutationResult<
    PhysicalCustomerUpdateResponse,
    any,
    { id: string; body: PhysicalCustomerUpdate }
  > {
    return useMutation<
      PhysicalCustomerUpdateResponse,
      any,
      { id: string; body: PhysicalCustomerUpdate }
    >({
      mutationFn: ({ id, body }) =>
        customerApi.updatePhysicalCustomer(id, body),
    });
  }

  public updateCorporateCustomer(): UseMutationResult<
    CorporateCustomerUpdateResponse,
    any,
    { id: string; body: CorporateCustomerUpdate }
  > {
    return useMutation<
      CorporateCustomerUpdateResponse,
      any,
      { id: string; body: CorporateCustomerUpdate }
    >({
      mutationFn: ({ id, body }) =>
        customerApi.updateCorporateCustomer(id, body),
    });
  }
}

export const customerService = new CustomerService();
