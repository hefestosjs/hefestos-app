interface AuthConfig {
	strategy: "web" | "token";
	table: string;
	uniqueColumn: string;
	tokenStrategy: {
		secret: string;
		expiresIn: string;
		useRedis: boolean;
	};
	sessionStrategy: {
		useRedis: boolean;
		prefix: string;
		secret: string;
		resave: boolean;
		saveUninitialized: boolean;
		cookie: {
			httpOnly: boolean;
			maxAge: number;
		};
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
	sessionStrategy: {
		useRedis: true,
		prefix: "myapp:", // RedisStore prefix
		secret: process.env.SESSION_SECRET || "secret",
		resave: false, // Required: force lightweight session keep alive (touch)
		saveUninitialized: false, // Recommended: only save session when data exists
		cookie: {
			httpOnly: true, // If true prevent client side JS from reading the cookie
			maxAge: 90 * 24 * 60 * 60 * 1000, // Session max age in miliseconds (3 months in this case)
		},
	},
};

export default auth;
