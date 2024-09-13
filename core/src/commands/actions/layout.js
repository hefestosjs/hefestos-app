const { join } = require("node:path");

module.exports = [
  {
    type: "add",
    path: join(process.cwd(), "app/resources/layouts/{{camelCase name}}.nj"),
    templateFile: "core/src/commands/templates/layout.nj",
  },
];
