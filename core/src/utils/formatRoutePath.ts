export function formatRoutePath(str: string): string {
	if (!str.startsWith("/")) {
		str = `/${str}`;
	}

	return str;
}
