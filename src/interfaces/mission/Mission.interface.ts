import { Paginate } from "@interfaces/config/ConfigList.interface";

interface MissionInterface {
    _id: string;
    name: string;
    customer: MissionCustomerInterface[];
    startingDate: string;
    refLawyer: MissionRefLawyerInterface[];
    m_progress: number;
    dueDate: string;
    letterTemplate: {
        _id: string;
        name: string;
    };
    billing: boolean;
    priceId: string;
    createdAt: string;
    updatedAt: string;
    activity: MissionActivityItemInterface[];
    blocks: MissionBlockInterface[];
}

export interface MissionDataInterface {
    statusCode: number;
    datas: MissionInterface
}

export interface MissionsDataInterface {
    statusCode: number;
    datas: MissionInterface[]
    paginate: Paginate
}

export interface MissionActivityItemInterface {
    date: string;
    ms: string;
    alterateId: string;
    table: string;
    action: string;
    method: string;
    type: {
        type: string;
        alterateId: string | null;
        ref: string;
    };
    userId: {
        _id: string;
        firstname: string;
        lastname: string;
    };
}


export interface MissionBlockInterface {
    _id: string;
    title: string;
    dueDate: string;
    userId: MissionUserInterface;
    b_progress: number;
    billing: boolean;
    tasks: MissionBlockTaskInterface[];
}

export interface MissionBlockTaskInterface {
    _id: string;
    name: string;
    done: boolean;
    date: string | null;
    taskConfig: {
        _id: string;
        type: number;
        priorityAffectation?: number;
    };
    taskTimer: TaskTimerInterface | null;
}

export interface TaskTimerInterface {
    _id: string;
    totalTimer: number;
}

export interface MissionUserInterface {
    _id: string;
    firstname: string;
    lastname: string;
}

export interface MissionRefLawyerInterface {
    _id: string;
    firstname: string;
    lastname: string;
}

export interface MissionCustomerInterface {
    _id?: string;
    name?: string;
    email1?: string;
    type: string;
    row_infos: MissionCustomerRowInfos;
}

export interface MissionCustomerRowInfos {
    firstname?: string;
    civilities?: number;
    phone1?: string;
    rSocial?: number;
}
