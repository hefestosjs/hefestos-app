import { createClient } from "redis";

const NODE_ENV = process.env.NODE_ENV;
export const redisClient = createClient();

if (!redisClient.isOpen) {
  redisClient.connect().then(
    () => {
      console.log("Connected to Redis");
      redisClient.flushAll().then(() => console.log("Redis cache clean"));
    },
    (error) => console.log(error)
  );

  process.on("exit", async () => {
    if (redisClient.isOpen) {
      await redisClient.disconnect();
    }
  });
}
