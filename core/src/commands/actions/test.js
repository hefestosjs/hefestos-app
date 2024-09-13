const { join } = require("node:path");

module.exports = [
  {
    type: "add",
    path: join(process.cwd(), "app/tests/{{ path }}/{{ name }}.spec.ts"),
    templateFile: "core/src/commands/templates/test.nj",
  },
];
