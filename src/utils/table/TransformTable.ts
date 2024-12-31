import { UserData } from "@interfaces/user/User.interface"
import { getFrDate } from "@utils/date.utils";
import Globals from "@utils/Globals";

export class TransformTable {


    protected users: any[] = [];

    protected lettersTemplate: any[] = [];



    refLawyer(value: number): string {
        const user = this.users.find((user: UserData) => user.id === value)
        if (!user) return 'N/A';
        return `${user.firstname} ${user.lastname}`;
    }

    collabList(value: number[]): string {
        if (!value) return '';
        return this.users.filter((user: UserData) => value.includes(user.id) && user.isActive === true).map((user: UserData) => user.firstname).join(', ') || 'N/A'
    }

    m_progress(value: number) {
        return { type: 'progress', value };
    }

    letterTemplate(value: string) {
        console.log("🚀 ~ TransformTable ~ letterTemplate ~ value:", value)
        // Handle case where value is null/undefined
        if (!value) return 'N/A';

        const template = this.lettersTemplate.find(letter => letter._id === value);
        console.log("🚀 ~ TransformTable ~ letterTemplate ~ his.lettersTemplate:", this.lettersTemplate)
        return template?.name || 'N/A';
    }

    formatDateFr(value: Date): string {
        return getFrDate(value)
    }

    billing(value: boolean) {
        return { type: 'icon_boolean', value };
    }

    customer(value: any[]) {
        if (!value || value.length === 0) return '';
        const customer = value[0];
        const firstname = customer.row_infos?.firstname || '';
        return {
            type: 'customer',
            value: `${customer.name} ${firstname.slice(0, 1).toUpperCase()}` || '',
            customerType: customer.type,
            civilities: Globals.civilities.find(civ => civ.value === customer.row_infos?.civilities)?.short || ''
        };
    }
}