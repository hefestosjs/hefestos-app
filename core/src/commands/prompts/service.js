module.exports = [
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
];
