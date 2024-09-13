module.exports = [
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
];
