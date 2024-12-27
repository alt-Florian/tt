import { TransformTable } from "./TransformTable";



class TableHelper extends TransformTable {





    format<T>(id: string, value: T) {
        if (!this.fields.includes(id)) return value;


        switch (id) {
            case 'refLawyer': return this.refLawyer(value as number);
            case 'collabList': return this.collabList(value as number[]);
            case 'm_progress': return this.m_progress(value as number);
        }

        return value;

    }


    setUsers(datas: any[]): void {
        this.users = datas;
    }



}


export const tableHelper = new TableHelper();