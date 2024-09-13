const { join } = require("node:path");

module.exports = [
  {
    type: "add",
    path: join(process.cwd(), "app/tasks/{{pascalCase name}}.ts"),
    templateFile: "core/src/commands/templates/task.nj",
  },
];
