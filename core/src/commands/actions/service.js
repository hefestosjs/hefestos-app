const { join } = require("node:path");

module.exports = (data) => {
  const actions = [];
  const basePath = process.cwd();

  if (data.organization === "single") {
    actions.push({
      type: "add",
      path: join(basePath, "app/services/{{pascalCase name}}.ts"),
      templateFile: "core/src/commands/templates/service.nj",
    });
  }

  if (data.organization === "multiple") {
    actions.push({
      type: "add",
      path: join(basePath, "app/services/{{pascalCase name}}/index.ts"),
      templateFile: "core/src/commands/templates/services/index.nj",
    });
    actions.push({
      type: "add",
      path: join(basePath, "app/services/{{pascalCase name}}/Create.ts"),
      templateFile: "core/src/commands/templates/services/Create.nj",
    });
    actions.push({
      type: "add",
      path: join(basePath, "app/services/{{pascalCase name}}/Update.ts"),
      templateFile: "core/src/commands/templates/services/Update.nj",
    });
    actions.push({
      type: "add",
      path: join(basePath, "app/services/{{pascalCase name}}/Show.ts"),
      templateFile: "core/src/commands/templates/services/Show.nj",
    });
    actions.push({
      type: "add",
      path: join(basePath, "app/services/{{pascalCase name}}/List.ts"),
      templateFile: "core/src/commands/templates/services/List.nj",
    });
    actions.push({
      type: "add",
      path: join(basePath, "app/services/{{pascalCase name}}/Delete.ts"),
      templateFile: "core/src/commands/templates/services/Delete.nj",
    });
  }

  return actions;
};
