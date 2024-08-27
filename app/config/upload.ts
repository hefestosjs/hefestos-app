export const uploadConfig = {
	aws: {
		credentials: {
			accessKeyId: process.env.S3_KEY,
			secretAccessKey: process.env.S3_SECRET,
		},
		bucket: process.env.S3_BUCKET,
		region: process.env.S3_REGION,
		bucketPath: process.env.S3_BUCKET_PATH,
		endpoint: process.env.S3_ENDPOINT,
	},
};
