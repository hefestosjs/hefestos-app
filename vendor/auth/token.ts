import { Request, Response, Next, redisClient } from "core";
import jwt from "jsonwebtoken";
import AuthConfig from "app/config/auth";

export type TokenType = {
  request: Request;
  response: Response;
  next?: Next;
  userId?: string;
};

export const Token = async (props: TokenType, option: "login" | "logout") => {
  if (option === "login") {
    const { userId } = props;
    const { secret, expiresIn, useRedis } = AuthConfig.tokenStrategy;

    const token = jwt.sign({ userId }, secret, { expiresIn });

    // Store token in Redis
    if (useRedis) {
      try {
        await redisClient.set(String(userId), token);
      } catch (error) {
        console.log(error);
      }
    } else {
      /**
       * Add your logic
       */
    }

    return {
      userId,
      token,
    };
  }

  if (option === "logout") {
    const { request, response } = props;
    const { useRedis, secret } = AuthConfig.tokenStrategy;

    const token = request.headers.authorization?.split(" ")[1];

    if (!token) {
      return response
        .status(401)
        .json({ message: "Access token not provided" });
    }

    jwt.verify(token, secret, async (err: any, decoded: any) => {
      if (err) {
        return response.status(401).json({ message: "Invalid access token" });
      }

      if (useRedis) {
        const accessToken = await redisClient.get(decoded.userId);

        if (!accessToken || accessToken !== token) {
          return response
            .status(401)
            .json({ message: "Access token not valid" });
        }

        return await redisClient.del(decoded.userId);
      } else {
        /**
         * Add your logic
         */
      }
    });
  }
};
