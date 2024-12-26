import { customerService } from "@services/customer/Customer.service";

export function PhysicalCustomerEnterprisesViewModel(id: string) {
  const {
    data: dataEnterprise,
    isPending: isPendingEnterprise,
    isError: isErrorEnterprise,
  } = customerService.getPhysicalCustomerEnterprise(id);

  return { dataEnterprise, isErrorEnterprise, isPendingEnterprise };
}
