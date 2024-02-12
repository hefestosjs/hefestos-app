import { Router } from "core/router";
import { upload } from "core/modules";

const useRouter = Router();

useRouter.get("/", (req, res) => res.render("home"));
useRouter.get("/404", (req, res) => res.render("404"));

useRouter.get("/count", (req, res) => {
  res.render("counter", { title: "Inicio", count: 0 });
});

useRouter.post("/upload", upload.single("file"), (req, res) => {
  return res.json(req.file?.filename);
});

useRouter.resources("users", "UsersController");

export default useRouter;

/**
 * Resources
 */
// useRouter.resources("users", "UsersController");
