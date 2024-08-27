type makeRequestType = {
	method?: string;
	headers?: Record<string, string>;
	url: string;
	path: string;
	body?: Object | FormData;
};

type ResponseType = {
	body: Record<string, any>;
	status: number;
};

export const makeRequest = async (props: makeRequestType) => {
	const { method, headers, url, path, body } = props;

	const defaultHeaders = {
		...(body instanceof FormData ? {} : { "Content-Type": "application/json" }),
		...headers,
	};

	const response = await fetch(`${url}/${path}`, {
		method,
		headers: defaultHeaders,
		body: body instanceof FormData ? body : JSON.stringify(body),
	});

	const data = await response.json();

	const result: ResponseType = {
		body: data,
		status: response.status,
	};

	return result;
};
