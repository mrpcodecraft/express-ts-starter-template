export interface IUser {
  id?: number;
  name: string;
  email: string;
  phone_number: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}