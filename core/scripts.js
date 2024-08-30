const { execSync, spawn } = require("node:child_process");
const path = require("node:path");

const npmBinPath = path.join(__dirname, "node_modules", ".bin");

const execCommand = (command) => {
  execSync(command, {
    stdio: "inherit",
    env: { ...process.env, PATH: `${npmBinPath}:${process.env.PATH}` },
  });
};

const execCommandParallel = (commands) => {
  const processes = commands.map((command) => {
    const [cmd, ...args] = command.split(" ");
    const child = spawn(cmd, args, {
      stdio: "inherit",
      env: { ...process.env, PATH: `${npmBinPath}:${process.env.PATH}` },
      shell: true,
    });

    child.on("error", (err) => {
      console.error(`Failed to start subprocess: ${err.message}`);
    });

    return child;
  });

  for (const child of processes) {
    child.on("close", (code) => {
      console.log(`Process exited with code ${code}`);
    });
  }
};

const commands = {
  // Build
  deleteDist: () => execCommand("rm -rf ./dist"),
  transpile: () => execCommand("tsc && tsc-alias"),
  copyFiles: () =>
    execCommand(
      "mkdir -p ./dist/app/resources && cp -r ./app/resources/* ./dist/app/resources",
    ),
  build: () => {
    commands.deleteDist();
    commands.transpile();
    commands.copyFiles();
  },

  // Monitoring
  start: () => execCommand("node dist/start/server.js"),
  ms: () => execCommand("nodemon --exec tsx start/server.ts"),
  dev: () => {
    execCommandParallel([
      "nodemon --exec tsx start/server.ts",
      "npx tailwindcss -i public/css/tailwind.css -o public/css/styles.css --watch",
    ]);
  },

  // Others
  test: (args) =>
    execCommand(
      `clear && jest --runInBand --detectOpenHandles --watchAll ${args.join(
        " ",
      )}`,
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
