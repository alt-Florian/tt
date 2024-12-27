import { UserData } from "@interfaces/user/User.interface"

export class TransformTable {


    protected fields = ['refLawyer', 'collabList', 'm_progress']

    protected users: any[] = [];



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
}