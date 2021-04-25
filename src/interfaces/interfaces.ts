/* export enum Gender {
  MALE,
  FEMALE,
  OTHER
 } */

 //export type Gender = "MALE" | "FEMALE" | "OTHER"

 export interface IChangeFriend {
   id?: string
   firstName?: string
   lastName?: string
   email: string
   password?: string
   role?: string
 }
 
 export default interface ILyndaFriend  {
   id? :string
   firstName: string
   lastName: string
   email: string
   password: string
   role?: string
 }
 