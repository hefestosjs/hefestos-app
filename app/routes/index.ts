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
 * Example: useRouter.resources("path", "Controller", [middleware]);
 */

export default useRouter;
