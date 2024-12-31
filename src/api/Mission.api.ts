//import { useApi } from "@hooks/api/useApi";
import { MissionDataInterface, MissionsDataInterface } from "@interfaces/mission/Mission.interface";

import { useApi } from "@hooks/api/useApi";


const api = useApi();

class MissionApi {

    public async fetch(
        skip: number,
        display: string[],
        sort: string
    ): Promise<MissionsDataInterface> {
        try {
            const { data } = await api.post(`/search?skip=${skip}&sort=${sort == '' ? '-createdAt':sort}`, {
                scope: 2,
                filterSet: [],
                query: [],
                conjonction: null,
                display
            });
            return data;
        } catch (error: any) {
            throw error;
        }
    }


    public async loadMissionById(missionId: string): Promise<MissionDataInterface> {
        console.log("missionId", missionId);
        try {
            //const { data } = await api.post("/auth/signin", credentials);
            const data: MissionDataInterface = {
                "statusCode": 200,
                "datas": {
                    "_id": "6453c650680047c44bd6ec42",
                    "name": "Cession AAIN-copy3-copy4",
                    "customer": [
                        {
                            "_id": "639caf872175950a96d92d1b",
                            "name": "BACHMANN",
                            "email1": "c.bachmann760@orange.fr",
                            "type": "1",
                            "row_infos": {
                                "firstname": "",
                                "civilities": 2,
                                "phone1": "06 63 76 99 61"
                            }
                        }
                    ],
                    "startingDate": "2023-05-04T14:50:56.924Z",
                    "refLawyer": [
                        {
                            "_id": "66ec1ff3fc27a447209b596a",
                            "firstname": "Laetitia",
                            "lastname": "PEREZ"
                        }
                    ],
                    "m_progress": 0,
                    "dueDate": "2023-03-10T00:00:00.000Z",
                    "letterTemplate": {
                        "_id": "622f9dc3554d36cf184edc79",
                        "name": "mission standard"
                    },
                    "billing": false,
                    "priceId": "6453c650680047c44bd6ec3e",
                    "createdAt": "2023-05-04T14:50:56.929Z",
                    "updatedAt": "2023-05-04T14:50:56.929Z",
                    "blocks": [
                        {
                            "_id": "6453c650680047c44bd6ec44",
                            "title": "Cession de parts sociales",
                            "dueDate": "2023-03-10T00:00:00.000Z",
                            "userId": {
                                "_id": "66ec1ff3fc27a447209b596f",
                                "firstname": "Romain",
                                "lastname": "PETITJEAN"
                            },
                            "b_progress": 0,
                            "billing": false,
                            "tasks": [
                                {
                                    "_id": "65ae36321b0fd6b01cb814ec",
                                    "name": "Collecte des informations",
                                    "done": true,
                                    "date": null,
                                    "taskConfig": {
                                        "_id": "6423e621310a5c2c30d1ef5e",
                                        "type": 0,
                                        "priorityAffectation": 3
                                    },
                                    "taskTimer": {
                                        "_id": "63f62fe0ffdb5940697b297d",
                                        "totalTimer": 878444
                                    }
                                },
                                {
                                    "_id": "65ae36321b0fd6b01cb814f0",
                                    "name": "Analyse des pièces recueillies ",
                                    "done": false,
                                    "date": null,
                                    "taskConfig": {
                                        "_id": "642557024a69608e275bc6a2",
                                        "type": 1
                                    },
                                    "taskTimer": {
                                        "_id": "63f62fe0ffdb5940697b297d",
                                        "totalTimer": 878444
                                    }
                                },
                                {
                                    "_id": "65ae36321b0fd6b01cb814f6",
                                    "name": "Validation des documents avec l’avocat référent",
                                    "done": false,
                                    "date": null,
                                    "taskConfig": {
                                        "_id": "642557034a69608e275bc6ab",
                                        "type": 0
                                    },
                                    "taskTimer": {
                                        "_id": "63f62fe0ffdb5940697b297d",
                                        "totalTimer": 0
                                    }
                                },
                                {
                                    "_id": "65ae36331b0fd6b01cb814fa",
                                    "name": "Envoi des documents au client pour validation",
                                    "done": false,
                                    "date": null,
                                    "taskConfig": {
                                        "_id": "642557034a69608e275bc6ae",
                                        "type": 0
                                    },
                                    "taskTimer": {
                                        "_id": "63f62fe0ffdb5940697b297d",
                                        "totalTimer": 0
                                    }
                                }
                            ]
                        }
                    ],
                    "activity": [
                        {
                            "date": "2023-05-04T14:50:57.467Z",
                            "ms": "ms_missions",
                            "alterateId": "6453c650680047c44bd6ec42",
                            "table": "missions",
                            "action": "CREATE",
                            "method": "generate",
                            "type": {
                                "type": "root",
                                "alterateId": null,
                                "ref": "_id"
                            },
                            "userId": {
                                "_id": "66ec1ff3fc27a447209b596b",
                                "firstname": "master",
                                "lastname": "mind"
                            }
                        }
                    ]
                }
            };

            return data;
        } catch (error: any) {
            throw error;
        }
    }

}

export const missionApi = new MissionApi();
