import { userApi } from "@api/User.api";
import { letterTemplateApi } from "@api/config/LetterTemplate.api";
import { customerApi } from "@api/customer/Customer.api";


class FilterService {

    async getFilterOptions(endpoint: string, extra: string='') {
        switch(endpoint) {
            case 'users': return userApi.fetchAllUsers(0, ['id', 'firstname', 'lastname']);
            case 'letterTemplates': return letterTemplateApi.getAllLetterTemplates();
            case 'customerSearch': return customerApi.search(extra)
            default: throw new Error(`No API endpoint configured for ${endpoint}`);
        }
    }
}

export const filterService = new FilterService();
