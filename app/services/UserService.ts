import { AppError, ResponseUtils, useCache } from "core";
import { User } from "app/database";
import { CreateUserInterface } from "../interfaces/UsersInterface";

export default class UserService {
  static async index(currentPage: number = 1) {
    const perPage = 10;
    const page = currentPage ? currentPage : 1;
    const skip = (page - 1) * perPage;

    // Cache
    const key = `users.list.params=${skip}_${perPage}`;
    const cached = await useCache.get(key);

    if (cached) {
      return JSON.parse(cached);
    }

    // Queries
    const totalUsers = await User.count();
    const query = await User.findMany({ take: perPage, skip });
    const users = ResponseUtils.excludeFromList(query, ["password"]);

    const response = ResponseUtils.paginate({
      data: users,
      totalData: totalUsers,
      page,
      perPage,
    });

    await useCache.set(key, JSON.stringify(response));

    return response;
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
