import { ZodError } from "zod";
import AppError from "../errors/AppError";
import type { ResponseInterface } from "../interfaces/router";

export default {
	success: (res: ResponseInterface, data?: any, redirect?: string): void => {
		if (typeof data === "string") {
			data = { message: data };
		}

		if (redirect) {
			if (!redirect.startsWith("/")) {
				redirect = "/" + redirect;
			}

			res.redirect(redirect);
			return;
		}

		res.json({
			status: "OK",
			result: data || null,
			error: null,
		});
		return;
	},

	pagination: (res: ResponseInterface, data: any): void => {
		const result = data.toJSON ? data.toJSON() : data;

		res.json({
			status: "OK",
			result: result.data || [],
			pagination: {
				page: result.meta.currentPage,
				lastPage: result.meta.lastPage,
				total: result.meta.total,
				perPage: result.meta.perPage,
			},
			error: null,
		});
	},

	error: function (
		res: ResponseInterface,
		...args:
			| [error: AppError | Error]
			| [code: string, message?: string, statusCode?: number]
	): void {
		const [code, message, statusCode] = args;

		if (code instanceof AppError) {
			this.appError(res, code);

			return;
		} else if (code instanceof ZodError) {
			const issues: Record<string, string[]> = {};

			code.errors.forEach((e) => {
				const field = e.path[0];
				if (!issues[field]) {
					issues[field] = [];
				}

				issues[field].push(e.message);
			});

			res.status(400).json({
				status: "ERROR",
				error: {
					code: "VALIDATION_ERROR",
					issues,
				},
			});

			return;
		} else if (code instanceof Error) {
			if (
				code.message.startsWith("E_ROUTE_NOT_FOUND") ||
				code.message.startsWith("E_ROW_NOT_FOUND")
			) {
				res.status(404).json({
					status: "ERROR",
					error: {
						code: "NOT_FOUND",
					},
				});

				return;
			}

			if (code.message.startsWith("E_UNAUTHORIZED_ACCESS")) {
				res.status(401).json({
					status: "ERROR",
					error: {
						code: "UNAUTHORIZED",
						message: "You must be logged in.",
					},
				});

				return;
			}

			res.status(statusCode ?? 500).json({
				status: "ERROR",
				error: {
					code: "INTERNAL_ERROR",
					message: code.message,
				},
			});
			return;
		}

		res.status(statusCode ?? 500).json({
			status: "ERROR",
			error: {
				code,
				message,
			},
		});
	},

	appError: (res: ResponseInterface, error: AppError): void => {
		res.status(error.status).json({
			status: "ERROR",
			error: {
				message: error.message,
			},
		});
	},
};
