interface AuthConfig {
  strategy: "web" | "token";
  table: string;
  uniqueColumn: string;
  tokenStrategy: {
    secret: string;
    expiresIn: string;
    useRedis: boolean;
  };
}

const auth: AuthConfig = {
  strategy: "web",
  table: "users",
  uniqueColumn: "email",
  tokenStrategy: {
    secret: process.env.JWT_SECRET || "secret",
    expiresIn: "30d",
    useRedis: true,
  },
};

export default auth;
