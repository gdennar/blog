import { NextResponse } from "next/server";
import { isApproved } from "./app/components/ui/Header";

export async function middleware(request) {
	// if (isApproved) {
	// 	return NextResponse.next();
	// } else {
	// 	return NextResponse.redirect(new URL("/", request.url));
	// }
	return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
	matcher: ["/api/posts/:path*", "/admin/posts", "/admin/form"],
};
