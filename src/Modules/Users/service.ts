import User from "./model";
import { IUser } from "./interface";
import q from "q";
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
  
  public async getAll(): Promise<IUser[] | HttpException> {
    const deferred = q.defer<IUser[] | HttpException>();

    try {
      const users = await User.findAll();
      deferred.resolve(users);
    } catch (error) {
      deferred.reject(new HttpException(500, "Failed to fetch users", error));
    }

    return deferred.promise;
  }

  public async getById(id: number): Promise<IUser | null | HttpException> {
    const deferred = q.defer<IUser | null | HttpException>();

    try {
      const user = await User.findByPk(id);
      deferred.resolve(user);
    } catch (error) {
      deferred.reject(new HttpException(500, "Failed to fetch user by id", error));
    }

    return deferred.promise;
  }

  public async create(data: IUser): Promise<IUser | HttpException> {
    const deferred = q.defer<IUser | HttpException>();

    try {
      const user = await User.create(data);
      deferred.resolve(user);
    } catch (error) {
      deferred.reject(new HttpException(500, "Failed to create user", error));
    }

    return deferred.promise;
  }

  public async update(id: number, data: Partial<IUser>): Promise<IUser | null | HttpException> {
    const deferred = q.defer<IUser | null | HttpException>();

    try {
      const user = await User.findByPk(id);

      if (!user) {
        deferred.resolve(null);
        return deferred.promise;
      }

      const updatedUser = await user.update(data);
      deferred.resolve(updatedUser);
    } catch (error) {
      deferred.reject(new HttpException(500, "Failed to update user", error));
    }

    return deferred.promise;
  }

  public async delete(id: number): Promise<boolean | HttpException> {
    const deferred = q.defer<boolean | HttpException>();

    try {
      const user = await User.findByPk(id);

      if (!user) {
        deferred.resolve(false);
        return deferred.promise;
      }

      await user.destroy();
      deferred.resolve(true);
    } catch (error) {
      deferred.reject(new HttpException(500, "Failed to delete user", error));
    }

    return deferred.promise;
  }
}