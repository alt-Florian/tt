import { UserData } from "@interfaces/user/User.interface"
import { getFrDate } from "@utils/date.utils";

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
        return this.users.filter((user: UserData) => value.includes(user.id)).map((user: UserData) => user.firstname).join(', ') || 'N/A'
    }

    m_progress(value: number) {
        return { type: 'progress', value };
    }

    letterTemplate(value: string) {
        return this.lettersTemplate.find(letter => letter._id === value).name || 'N/A';
    }

    formatDateFr(value: Date): string {
        return getFrDate(value)
    }

    billing(value: boolean) {
        return { type: 'icon_boolean', value };
    }

    customer(value: any[]) {
        return value[0].name || '';
    }
}