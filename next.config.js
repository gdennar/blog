/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		domains: ["images.unsplash.com"],
	},
	env: {
		mongodb_url:
			"mongodb+srv://goldendennar:LDbMsJFdu8HhXNPO@cluster0.kidj1id.mongodb.net/?retryWrites=true&w=majority",
		admin_key: "Denny",
	},
};

module.exports = nextConfig;
