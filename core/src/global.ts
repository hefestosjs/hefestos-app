const env = process.env.NODE_ENV;

export const isProd = env === "production" ? "dist" : "";
