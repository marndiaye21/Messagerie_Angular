export interface IUser{
    id?:number,
    firstname: string,
    lastname:string,
    phone:string,
    email: string,
    password?:string,
    password_confirmation?:string
}