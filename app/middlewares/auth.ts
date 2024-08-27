import AuthConfig from "app/config/auth";
import { type Next, type Request, type Response, redisClient } from "core";
import jwt from "jsonwebtoken";

function isAuthenticated(request: Request, response: Response, next: Next) {
	if (AuthConfig.strategy === "web") {
		if (!request.session.user) return next("route");

		return next();
	}

	if (AuthConfig.strategy === "token") {
		const token = request.headers.authorization?.split(" ")[1];

		if (!token) {
			return response
				.status(401)
				.json({ message: "Access token not provided" });
		}

		jwt.verify(
			token,
			AuthConfig.tokenStrategy.secret,
			async (err: any, decoded: any) => {
				if (err) {
					return response.status(401).json({ message: "Invalid access token" });
				}

				if (AuthConfig.tokenStrategy.useRedis) {
					const accessToken = await redisClient.get(decoded.userId);

					if (!accessToken || accessToken !== token) {
						return response
							.status(401)
							.json({ message: "Access token not valid" });
					}

					next();
				} else {
					/**
					 * Add your logic
					 */
				}
			},
		);
	}
}

export { isAuthenticated };
