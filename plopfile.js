const { join } = require("path");
const pluralize = require("pluralize");

module.exports = (plop) => {
  plop.setHelper("pluralize", (str) => pluralize(str));

  plop.setGenerator("controller", {
    description: "Application controller logic",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Controller name",
      },
    ],
    actions: [
      {
        type: "add",
        path: join(
          process.cwd(),
          "app/controllers/{{pascalCase name}}Controller.ts"
        ),
        templateFile: "core/src/commands/templates/controller.nj",
      },
    ],
  });

  plop.setGenerator("service", {
    description: "Application service logic",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Service name",
      },
      {
        type: "list",
        name: "organization",
        message: "Select the organization type",
        choices: [
          { name: "Single file", value: "single" },
          { name: "Multiple files", value: "multiple" },
        ],
      },
    ],
    actions: function (data) {
      const actions = [];
      const basePath = process.cwd();

      if (data.organization === "single") {
        actions.push({
          type: "add",
          path: join(basePath, "app/services/{{pascalCase name}}.ts"),
          templateFile: "core/src/commands/templates/service.nj",
        });
      } else if (data.organization === "multiple") {
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
    },
  });

  plop.setGenerator("validation", {
    description: "Application route validation logic",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Validation name (recommended to use plural)",
      },
    ],
    actions: [
      {
        type: "add",
        path: join(
          process.cwd(),
          "app/validations/{{pascalCase name}}/index.ts"
        ),
        templateFile: "core/src/commands/templates/validation_index.nj",
      },
      {
        type: "add",
        path: join(
          process.cwd(),
          "app/validations/{{pascalCase name}}/Create.ts"
        ),
        templateFile: "core/src/commands/templates/validation_create.nj",
      },
      {
        type: "add",
        path: join(
          process.cwd(),
          "app/validations/{{pascalCase name}}/Update.ts"
        ),
        templateFile: "core/src/commands/templates/validation_update.nj",
      },
    ],
  });

  plop.setGenerator("task", {
    description: "Application task logic",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Task name",
      },
    ],
    actions: [
      {
        type: "add",
        path: join(process.cwd(), "app/tasks/{{pascalCase name}}.ts"),
        templateFile: "core/src/commands/templates/task.nj",
      },
    ],
  });

  plop.setGenerator("test", {
    description: "Application test logic",
    prompts: [
      {
        type: "input",
        name: "path",
        message: "Test path",
      },
      {
        type: "input",
        name: "name",
        message: "Test name",
      },
    ],
    actions: [
      {
        type: "add",
        path: join(process.cwd(), "app/tests/{{ path }}/{{ name }}.spec.ts"),
        templateFile: "core/src/commands/templates/test.nj",
      },
    ],
  });

  plop.setGenerator("layout", {
    description: "Application layout resource",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Layout name",
      },
    ],
    actions: [
      {
        type: "add",
        path: join(
          process.cwd(),
          "app/resources/layouts/{{camelCase name}}.nj"
        ),
        templateFile: "core/src/commands/templates/layout.nj",
      },
    ],
  });

  plop.setGenerator("view", {
    description: "Application view resource",
    prompts: [
      {
        type: "input",
        name: "path",
        message: "View path",
      },
      {
        type: "input",
        name: "name",
        message: "View name",
      },
    ],
    actions: [
      {
        type: "add",
        path: join(
          process.cwd(),
          "app/resources/views/{{ path }}/{{camelCase name}}.nj"
        ),
        templateFile: "core/src/commands/templates/view.nj",
      },
    ],
  });

  plop.setGenerator("factory", {
    description: "Application factory logic",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Model name",
      },
    ],
    actions: [
      {
        type: "add",
        path: join(
          process.cwd(),
          "app/database/factories/{{pascalCase name}}Factory.ts"
        ),
        templateFile: "core/src/commands/templates/factory.nj",
      },
    ],
  });

  plop.setGenerator("------------ End ------------", {
    description: "",
    prompts: [],
    actions: [],
  });
};
