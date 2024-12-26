import { customerService } from "@services/customer/Customer.service";

export function CorporateCustomerEnterprisesViewModel(id: string) {
  const {
    data: dataEnterprise,
    isPending: isPendingEnterprise,
    isError: isErrorEnterprise,
  } = customerService.getCorporateCustomerEnterprise(id);

  return { dataEnterprise, isErrorEnterprise, isPendingEnterprise };
}
