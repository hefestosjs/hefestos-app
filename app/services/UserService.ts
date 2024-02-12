import { AppError } from "core";
import { User } from "app/database";
import { CreateUserInterface } from "../interfaces/UsersInterface";

export default class UserService {
  static async index() {
    const users = await User.findMany();

    return users;
  }

  static async show(id: string) {
    const user = await User.findFirstOrThrow({ where: { id } });

    return user;
  }

  static async store(data: CreateUserInterface) {
    const user = await User.create({ data: data });

    if (!user) throw AppError.E_GENERIC_ERROR("Error when create a user");

    return user;
  }

  static async update(id: string, name: string, email: string) {
    await User.findFirstOrThrow({ where: { id } });

    const user = await User.update({
      where: { id },
      data: { name, email },
    });

    return user;
  }

  static async destroy(id: string) {
    const user = await User.delete({ where: { id } });

    return user;
  }
}
