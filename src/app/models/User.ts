export interface IUser{
    id?:number,
    firstname: string,
    lastname:string,
    phone:string,
    password?:string,
    password_confirmation?:string
}