/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,

  rootDir: ".",
  testPathIgnorePatterns: ["/node_modules/"],

  collectCoverageFrom: [
    "app/controllers/**/*.ts",
    "app/services/**/*.ts",
    "app/tasks/**/*.ts",
  ],
  coverageReporters: ["json", "html", "text"],

  modulePaths: ["<rootDir>"],
  moduleDirectories: ["node_modules", "app"],
  moduleFileExtensions: ["js", "ts"],
};
