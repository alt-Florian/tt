import { UserData } from "@interfaces/user/User.interface"
import { userService } from "@services/User.service"




export class TransformTable {



    protected fields = ['refLawyer', 'collabList']




    refLawyer(value: number): string {
        return userService.getCached().users.find((user: UserData) => user.id === value)?.firstname || ''
    }

    collabList(value: number[]): string {
        return userService.getCached().users.filter((user: UserData) => value.includes(user.id)).map((user: UserData) => user.firstname).join(', ')
    }

}