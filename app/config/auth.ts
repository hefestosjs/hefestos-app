interface AuthConfig {
  strategy: "web" | "token";
  table: string;
  uniqueColumn: string;
}

const auth: AuthConfig = {
  strategy: "web",
  table: "users",
  uniqueColumn: "email",
};

export default auth;
