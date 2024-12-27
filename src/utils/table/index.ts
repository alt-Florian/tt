import { TransformTable } from "./TransformTable";



class TableHelper extends TransformTable {






    format<T>(id: string, value: T) {
 
        switch (id) {
            case 'refLawyer': return this.refLawyer(value as number);
            case 'collabList': return this.collabList(value as number[]);
            case 'm_progress': return this.m_progress(value as number);
            case 'letterTemplate': return this.letterTemplate(value as string);
            case 'startingDate': return this.formatDateFr(value as Date);
            case 'dueDate': return this.formatDateFr(value as Date);
            case 'billing': return this.billing(value as boolean);
            case 'customer': return this.customer(value as any[]);
            default: return value;
        }


    }


    setUsers(datas: any[]): void {
        this.users = datas;
    }

    setLettersTemplate(datas: any[]): void {
        this.lettersTemplate = datas;
    }



}


export const tableHelper = new TableHelper();