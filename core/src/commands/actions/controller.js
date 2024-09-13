const { join } = require("node:path");

module.exports = (data) => {
  const actions = [];
  const basePath = process.cwd();

  if (data.organization === "fullstack") {
    actions.push({
      type: "add",
      path: join(basePath, "app/controllers/{{pascalCase name}}Controller.ts"),
      templateFile: "core/src/commands/templates/controllers/fullstack.nj",
    });
  }

  if (data.organization === "api") {
    actions.push({
      type: "add",
      path: join(basePath, "app/controllers/{{pascalCase name}}Controller.ts"),
      templateFile: "core/src/commands/templates/controllers/api.nj",
    });
  }

  return actions;
};
