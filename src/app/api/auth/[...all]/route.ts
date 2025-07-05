import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest } from "next/server";
import log, {
  generateRequestId,
  setRequestContext,
  clearRequestContext,
} from "@/lib/logger";

export const { GET } = toNextJsHandler(auth);

export const POST = async (req: NextRequest) => {
  const start = Date.now();

  // Set up request tracing for auth operations
  const requestId = generateRequestId();
  setRequestContext({ requestId });

  try {
    const pathname = req.nextUrl.pathname;

    // Log auth attempt with request context
    log.info("Auth request", {
      domain: "auth",
      method: req.method,
      path: pathname,
      userAgent: req.headers.get("user-agent") || undefined,
    });

    const res = await auth.handler(req);
    const duration = Date.now() - start;

    // Log auth response
    log.info("Auth response", {
      domain: "auth",
      method: req.method,
      path: pathname,
      statusCode: res.status,
      duration,
    });

    return res;
  } catch (error) {
    const duration = Date.now() - start;

    log.error("Auth error", {
      domain: "auth",
      method: req.method,
      path: req.nextUrl.pathname,
      duration,
      error: error instanceof Error ? error.message : String(error),
    });

    throw error;
  } finally {
    // Clean up request context
    clearRequestContext();
  }
};
