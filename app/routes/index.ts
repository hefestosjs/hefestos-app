import { Router } from "core/router";

const useRouter = Router();

/**
 * Direct routes
 * Used, mainly, when you want to make static views
 */
useRouter.get("/", (req, res) => res.render("home"));
useRouter.get("/404", (req, res) => res.render("404"));

/**
 * Resources
 * Used when you want to make a default CRUD
 */
useRouter.resources("users", "UsersController");

export default useRouter;
