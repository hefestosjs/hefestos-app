const { join } = require("node:path");

module.exports = [
  {
    type: "add",
    path: join(
      process.cwd(),
      "app/resources/views/{{ path }}/{{camelCase name}}.nj",
    ),
    templateFile: "core/src/commands/templates/view.nj",
  },
];
