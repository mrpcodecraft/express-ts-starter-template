import User from "./model";
import { IUser } from "./interface";
import HttpException from "../../Exceptions/HTTPExceptions";

export default class UserService {

  private static _instance: UserService | null = null;

  private constructor() {}

  public static getInstance(): UserService {
    if (!UserService._instance) {
      UserService._instance = new UserService();
    }

    return UserService._instance;
  }
  
  public async getAll(): Promise<IUser[]> {
    try {
      return await User.findAll();
    } catch (error) {
      throw new HttpException(500, "Failed to fetch users", error);
    }
  }

  public async getById(id: number): Promise<IUser | null> {
    try {
      return await User.findByPk(id);
    } catch (error) {
      throw new HttpException(500, "Failed to fetch user by id", error);
    }
  }

  public async create(data: IUser): Promise<IUser> {
    try {
      return await User.create(data);
    } catch (error) {
      throw new HttpException(500, "Failed to create user", error);
    }
  }

  public async update(id: number, data: Partial<IUser>): Promise<IUser | null> {
    try {
      const user = await User.findByPk(id);

      if (!user) {
        return null;
      }

      return await user.update(data);
    } catch (error) {
      throw new HttpException(500, "Failed to update user", error);
    }
  }

  public async delete(id: number): Promise<boolean> {
    try {
      const user = await User.findByPk(id);

      if (!user) {
        return false;
      }

      await user.destroy();
      return true;
    } catch (error) {
      throw new HttpException(500, "Failed to delete user", error);
    }
  }
}