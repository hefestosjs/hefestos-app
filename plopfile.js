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
    description: "Application validation logic",
    prompts: [
      {
        type: "list",
        name: "validation",
        message: "What do you want to create?",
        choices: [
          { name: "A validation set", value: "set" },
          { name: "A single validation file", value: "single" },
        ],
      },
      {
        type: "input",
        name: "folder",
        message: "Validation folder name",
        when: (answers) => answers.validation === "single",
      },
      {
        type: "input",
        name: "name",
        message: "Validation name",
        when: (answers) => answers.validation === "single",
      },
      {
        type: "input",
        name: "set",
        message: "Validation set name (Recommended to use a model name)",
        when: (answers) => answers.validation === "set",
      },
    ],
    actions: function (data) {
      const actions = [];
      const basePath = process.cwd();

      if (data.validation === "single") {
        actions.push({
          type: "add",
          path: join(
            basePath,
            "app/validations/{{pascalCase folder}}/{{pascalCase name}}.ts"
          ),
          templateFile: "core/src/commands/templates/validations/example.nj",
        });
      } else if (data.validation === "set") {
        actions.push({
          type: "add",
          path: join(basePath, "app/validations/{{pascalCase set}}/index.ts"),
          templateFile: "core/src/commands/templates/validations/index.nj",
        });

        actions.push({
          type: "add",
          path: join(basePath, "app/validations/{{pascalCase set}}/Create.ts"),
          templateFile: "core/src/commands/templates/validations/create.nj",
        });

        actions.push({
          type: "add",
          path: join(basePath, "app/validations/{{pascalCase set}}/Update.ts"),
          templateFile: "core/src/commands/templates/validations/update.nj",
        });
      }

      return actions;
    },
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
