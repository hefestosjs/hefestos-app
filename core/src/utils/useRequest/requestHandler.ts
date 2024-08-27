import { makeRequest } from "./makeRequest";

type useRequestType = {
	url?: string;
	path: string;
	body?: Object | FormData;
	headers?: Record<string, string>;
};

const API_URL_DEFAULT = `http://localhost:${process.env.PORT || "3000"}`;
const API_URL = process.env.API_URL || API_URL_DEFAULT;

export const requestHandler = {
	GET: async ({ url, path, headers }: useRequestType) => {
		return await makeRequest({
			method: "GET",
			url: url || API_URL,
			path,
			headers,
		});
	},

	POST: async ({ url, path, body, headers }: useRequestType) => {
		return await makeRequest({
			method: "POST",
			url: url || API_URL,
			path,
			body,
			headers,
		});
	},

	PUT: async ({ url, path, body, headers }: useRequestType) => {
		return await makeRequest({
			method: "PUT",
			url: url || API_URL,
			path,
			body,
			headers,
		});
	},

	PATCH: async ({ url, path, body, headers }: useRequestType) => {
		return await makeRequest({
			method: "PATCH",
			url: url || API_URL,
			path,
			body,
			headers,
		});
	},

	DELETE: async ({ url, path, headers }: useRequestType) => {
		return await makeRequest({
			method: "DELETE",
			url: url || API_URL,
			path,
			headers,
		});
	},
};
