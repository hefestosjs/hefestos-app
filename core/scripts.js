const { execSync } = require("child_process");
const path = require("path");

const npmBinPath = path.join(__dirname, "node_modules", ".bin");

const execCommand = (command) => {
  execSync(command, {
    stdio: "inherit",
    env: { ...process.env, PATH: `${npmBinPath}:${process.env.PATH}` },
  });
};

const commands = {
  // Build
  deleteDist: () => execCommand("rm -rf ./dist"),
  transpile: () => execCommand("tsc && tsc-alias"),
  copyFiles: () =>
    execCommand(
      "mkdir -p ./dist/app/resources && cp -r ./app/resources/* ./dist/app/resources"
    ),
  build: () => {
    commands.deleteDist();
    commands.transpile();
    commands.copyFiles();
  },

  // Monitoring
  start: () => execCommand("node dist/start/server.js"),
  ms: () => execCommand("clear && nodemon --exec tsx start/server.ts"),
  dev: () => {
    const monitorServer = execCommand("nodemon --exec tsx start/server.ts");
    const monitorTailwind = execCommand(
      "npx tailwindcss -i public/css/tailwind.css -o public/css/styles.css --watch"
    );

    execCommand(
      `clear && npm-run-all --parallel ${monitorServer} ${monitorTailwind}`
    );
  },

  // Others
  test: (args) =>
    execCommand(
      `clear && jest --runInBand --detectOpenHandles --watchAll ${args.join(
        " "
      )}`
    ),
  generate: () => execCommand("clear && plop"),
  studio: () => execCommand("prisma studio"),
  seed: () => execCommand("prisma db seed"),
};

const [, , script, ...args] = process.argv;

if (commands[script]) {
  commands[script](args);
} else {
  console.log(`Script "${script}" not found`);
}
