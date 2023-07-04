// const dns = require("dns");
// dns.setDefaultResultOrder("ipv4first");
// const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

/** @type {import('next').NextConfig} */

const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		domains: ["images.unsplash.com"],
	},
	// env: {
	// 	mongodb_url:
	// 		"mongodb+srv://goldendennar:LDbMsJFdu8HhXNPO@cluster0.kidj1id.mongodb.net/?retryWrites=true&w=majority",
	// 	admin_key: "Denny",
	// 	api_url: "http://127.0.0.1:3000",
	// }
};

// return {
// 	experimental: {
// 		appDir: true,
// 	},
// 	images: {
// 		domains: ["images.unsplash.com"],
// 	},
// 	env: {
// 		mongodb_url:
// 			"mongodb+srv://goldendennar:LDbMsJFdu8HhXNPO@cluster0.kidj1id.mongodb.net/?retryWrites=true&w=majority",
// 		admin_key: "Denny",
// 		api_url: "http://127.0.0.1:3000",
// 	},
// };

module.exports = nextConfig;
