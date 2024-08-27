import type { RequestInterface, ResponseInterface } from "../interfaces/router";

export default function MethodOverride(
	req: RequestInterface,
	res: ResponseInterface,
) {
	if (req.body && typeof req.body === "object" && "_method" in req.body) {
		const method = req.body._method;

		// biome-ignore lint/performance/noDelete: <explanation>
		delete req.body._method;

		return method;
	}
}
