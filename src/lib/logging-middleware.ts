import { NextRequest, NextResponse } from "next/server";
import log, {
  generateRequestId,
  setRequestContext,
  clearRequestContext,
  logApi,
} from "./logger";

export interface LoggingOptions {
  logRequests?: boolean;
  logResponses?: boolean;
  logErrors?: boolean;
  excludePaths?: string[];
  sensitiveHeaders?: string[];
}

const defaultOptions: LoggingOptions = {
  logRequests: true,
  logResponses: true,
  logErrors: true,
  excludePaths: ["/api/health", "/api/ping"],
  sensitiveHeaders: ["authorization", "cookie", "x-api-key"],
};

/**
 * Logging middleware that automatically adds request IDs and logs API calls
 *
 * @example
 * ```typescript
 * // Wrap your API handler
 * export const GET = withLogging(async (req) => {
 *   // All logs within this request will include the same requestId
 *   log.info('Processing request', { userId: '123' })
 *   return NextResponse.json({ success: true })
 * })
 * ```
 */
export function withLogging(
  handler: (req: NextRequest) => Promise<NextResponse>,
  options: LoggingOptions = {},
) {
  const config = { ...defaultOptions, ...options };

  return async (req: NextRequest): Promise<NextResponse> => {
    const start = Date.now();
    const { pathname } = req.nextUrl;
    const method = req.method;

    // Skip logging for excluded paths
    if (config.excludePaths?.includes(pathname)) {
      return handler(req);
    }

    // Generate unique request ID
    const requestId = generateRequestId();

    // Set request context for all logs within this request
    setRequestContext({ requestId });

    // Extract user info from headers/auth
    const userId = req.headers.get("x-user-id") || undefined;
    const sessionId = req.headers.get("x-session-id") || undefined;

    try {
      // Log request
      if (config.logRequests) {
        logApi.request(pathname, method, userId);

        // Log detailed request info in debug mode
        const headers = Object.fromEntries(req.headers.entries());
        const filteredHeaders = Object.keys(headers).reduce(
          (acc, key) => {
            if (config.sensitiveHeaders?.includes(key.toLowerCase())) {
              acc[key] = "[REDACTED]";
            } else {
              acc[key] = headers[key];
            }
            return acc;
          },
          {} as Record<string, string>,
        );

        log.debug("Request details", {
          domain: "api",
          userId,
          sessionId,
          pathname,
          method,
          headers: filteredHeaders,
          query: Object.fromEntries(req.nextUrl.searchParams),
        });
      }

      const response = await handler(req);
      const duration = Date.now() - start;

      // Log response
      if (config.logResponses) {
        logApi.response(pathname, method, response.status, duration);

        log.debug("Response details", {
          domain: "api",
          userId,
          sessionId,
          pathname,
          method,
          statusCode: response.status,
          duration,
          headers: Object.fromEntries(response.headers.entries()),
        });
      }

      return response;
    } catch (error) {
      const duration = Date.now() - start;

      // Log error
      if (config.logErrors) {
        logApi.error(pathname, method, error as Error, userId);

        log.error("Request failed", {
          domain: "api",
          userId,
          sessionId,
          pathname,
          method,
          duration,
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
        });
      }

      throw error;
    } finally {
      // Clean up request context
      clearRequestContext();
    }
  };
}

/**
 * Simple helper for manual API logging (when not using middleware)
 */
export const logApiCall = (
  path: string,
  method: string,
  context: {
    userId?: string;
    duration?: number;
    statusCode?: number;
    error?: Error;
  } = {},
) => {
  const { userId, duration, statusCode, error } = context;

  if (error) {
    logApi.error(path, method, error, userId);
  } else if (statusCode) {
    logApi.response(path, method, statusCode, duration || 0);
  } else {
    logApi.request(path, method, userId);
  }
};
