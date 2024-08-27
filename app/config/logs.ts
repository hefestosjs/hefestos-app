const LogsConfig = {
	active: false,
	env: {
		production: {
			size: "5M",
			interval: "1d",
			compress: "gzip",
			format: "combined",
		},
		development: {
			format: "combined",
		},
	},
};

export default LogsConfig;
