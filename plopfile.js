const { join } = require("path");

module.exports = (plop) => {
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
    ],
    actions: [
      {
        type: "add",
        path: join(process.cwd(), "app/services/{{pascalCase name}}Service.ts"),
        templateFile: "core/src/commands/templates/service.nj",
      },
    ],
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
};
