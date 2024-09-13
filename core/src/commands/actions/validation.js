const { join } = require("node:path");

module.exports = (data) => {
  const actions = [];
  const basePath = process.cwd();

  if (data.validation === "single") {
    actions.push({
      type: "add",
      path: join(
        basePath,
        "app/validations/{{pascalCase (pluralize folder)}}/{{pascalCase name}}.ts",
      ),
      templateFile: "core/src/commands/templates/validations/example.nj",
    });
  }

  if (data.validation === "set") {
    actions.push({
      type: "add",
      path: join(
        basePath,
        "app/validations/{{pascalCase (pluralize set)}}/index.ts",
      ),
      templateFile: "core/src/commands/templates/validations/index.nj",
    });

    actions.push({
      type: "add",
      path: join(
        basePath,
        "app/validations/{{pascalCase (pluralize set)}}/Create.ts",
      ),
      templateFile: "core/src/commands/templates/validations/create.nj",
    });

    actions.push({
      type: "add",
      path: join(
        basePath,
        "app/validations/{{pascalCase (pluralize set)}}/Update.ts",
      ),
      templateFile: "core/src/commands/templates/validations/update.nj",
    });
  }

  return actions;
};
