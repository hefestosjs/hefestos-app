const { join } = require("node:path");

module.exports = [
  {
    type: "add",
    path: join(
      process.cwd(),
      "app/database/factories/{{pascalCase name}}Factory.ts",
    ),
    templateFile: "core/src/commands/templates/factory.nj",
  },
];
