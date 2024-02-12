import { ApiResponse, Request, Response } from "core";
import UserService from "app/services/UserService";
import UsersValidator from "app/validations/User";

export default class UsersController {
  static async index(request: Request, response: Response) {
    const users = await UserService.index();

    return response.render("users/list", { title: "User List", users });
  }

  static async show(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const user = await UserService.show(id);

      return response.render("users/show", { user });
    } catch (error: any) {
      return ApiResponse.error(response, error);
    }
  }

  static async create(request: Request, response: Response) {
    return response.render("users/create", { title: "Create User" });
  }

  static async store(request: Request, response: Response) {
    try {
      await UsersValidator.Create(request.body);
      const user = await UserService.store(request.body);

      return ApiResponse.success(response, user, "users");
    } catch (error: any) {
      return ApiResponse.error(response, error);
    }
  }

  static async edit(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { name, email } = await UserService.show(id);

      return response.render("users/edit", { id, name, email });
    } catch (error: any) {
      return ApiResponse.error(response, error);
    }
  }

  static async update(request: Request, response: Response) {
    try {
      await UsersValidator.Update(request.body);
      const { id } = request.params;
      const { name, email } = request.body;
      const user = await UserService.update(id, name, email);

      return ApiResponse.success(response, user, "users");
    } catch (error: any) {
      return ApiResponse.error(response, error);
    }
  }

  static async destroy(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const user = await UserService.destroy(id);

      return ApiResponse.success(response, user, "users");
    } catch (error: any) {
      return ApiResponse.error(response, error);
    }
  }
}
