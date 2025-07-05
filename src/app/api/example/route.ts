import { NextRequest, NextResponse } from "next/server";
import log, { logAuth, logDb } from "@/lib/logger";
import { withLogging } from "@/lib/logging-middleware";

async function handler(req: NextRequest) {
  try {
    // All logs will automatically include the same requestId
    const userId = req.headers.get("x-user-id");

    // Example: Authentication logging (if user is authenticated)
    if (userId) {
      logAuth.login(userId, "api-key");
    }

    // Example: Database operation with timing
    const start = Date.now();
    // Simulate database call
    await new Promise((resolve) => setTimeout(resolve, 100));
    const duration = Date.now() - start;

    logDb.query("users", "SELECT", duration);

    // Example: Business logic logging with domain context
    log.info("Processing example request", {
      domain: "business",
      userId: userId || undefined,
      timestamp: new Date().toISOString(),
      userAgent: req.headers.get("user-agent") || undefined,
    });

    // Example: Success response
    log.info("Example request completed successfully", {
      domain: "business",
      processingTime: Date.now() - start,
    });

    return NextResponse.json({
      success: true,
      message: "Example API with request tracing",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    // Error logging with full context (requestId automatically included)
    log.error("Example API failed", {
      domain: "business",
      error: error instanceof Error ? error.message : String(error),
      userId: req.headers.get("x-user-id") || undefined,
    });

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// Wrap with logging middleware for automatic request/response logging
export const GET = withLogging(handler);
export const POST = withLogging(handler);
