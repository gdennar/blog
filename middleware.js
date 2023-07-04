import { NextResponse } from "next/server";
import { isApproved } from "./app/components/ui/Header";

export async function middleware(request) {
	const { pathname } = request.nextUrl;

	// if (pathname.startsWith("/api/admin") && !isApproved) {
	// 	return new NextResponse(
	// 		JSON.stringify({
	// 			success: false,
	// 			message: "authentication failed",
	// 		}),
	// 		{ status: 401, headers: { "content-type": "application/json" } }
	// 	);
	// 	//return NextResponse.redirect(new URL("/error"), request.url);
	// }
	return NextResponse.next();
}

export const config = {
	matcher: "/api/admin/:path*",
};
