module.exports = [
  {
    type: "input",
    name: "name",
    message: "Controller name",
  },
  {
    type: "list",
    name: "organization",
    message: "Select the type of controller",
    choices: [
      { name: "Full Stack", value: "fullstack" },
      { name: "API Only", value: "api" },
    ],
  },
];
