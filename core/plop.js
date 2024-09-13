const pluralize = require("pluralize");

const Prompts = require("./src/commands/prompts");
const Actions = require("./src/commands/actions");

module.exports = (plop) => {
  plop.setHelper("pluralize", (str) => pluralize(str));

  plop.setGenerator("validation", {
    description: "Application validation logic",
    prompts: Prompts.validation,
    actions: (data) => Actions.validation(data),
  });

  plop.setGenerator("service", {
    description: "Application service logic",
    prompts: Prompts.service,
    actions: (data) => Actions.service(data),
  });

  plop.setGenerator("controller", {
    description: "Application controller logic",
    prompts: Prompts.controller,
    actions: (data) => Actions.controller(data),
  });

  plop.setGenerator("factory", {
    description: "Application factory logic",
    prompts: Prompts.factory,
    actions: Actions.factory,
  });

  plop.setGenerator("test", {
    description: "Application test logic",
    prompts: Prompts.test,
    actions: Actions.test,
  });

  plop.setGenerator("task", {
    description: "Application task logic",
    prompts: Prompts.task,
    actions: Actions.task,
  });

  plop.setGenerator("layout", {
    description: "Application layout resource",
    prompts: Prompts.layout,
    actions: Actions.layout,
  });

  plop.setGenerator("view", {
    description: "Application view resource",
    prompts: Prompts.view,
    actions: Actions.view,
  });

  plop.setGenerator("------------ End ------------", {
    description: "",
    prompts: [],
    actions: [],
  });
};
