import { NextResponse } from "next/server";

export default function handler(request) {
	NextResponse.status(401).json({ message: "Not allowed access." });
}
