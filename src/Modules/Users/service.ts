import User from "./model";
import { IUser } from "./interface";

export default class UserService {

  private static _instance: UserService | null = null;

  private constructor() {}

  public static getInstance(): UserService {
    if (!UserService._instance) {
      UserService._instance = new UserService();
    }

    return UserService._instance;
  }
  
  async getAll() {
    return User.findAll();
  }

  async getById(id: number) {
    return User.findByPk(id);
  }

  async create(data: IUser) {
    return User.create(data);
  }

  async update(id: number, data: Partial<IUser>) {
    const user = await User.findByPk(id);

    if (!user) {
      return null;
    }

    return user.update(data);
  }

  async delete(id: number) {
    const user = await User.findByPk(id);

    if (!user) {
      return false;
    }

    await user.destroy();

    return true;
  }
}