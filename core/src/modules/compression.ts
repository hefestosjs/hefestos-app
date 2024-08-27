import compression from "compression";
import type { Express } from "express";

export default function Compression(APP: Express) {
	APP.use(
		compression({
			level: 6,
			threshold: 100 * 1000, // equal 100kb
			filter: (req, res) => {
				if (req.headers["x-no-compression"]) {
					return false;
				}

				return compression.filter(req, res);
			},
		}),
	);
}
