import pino from "pino";
import { nanoid } from "nanoid";

// Configure logger based on environment
const baseLogger = pino({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  // Disable pino-pretty transport to avoid worker script issues in Next.js
  // Use simple JSON logging instead
  base: {
    env: process.env.NODE_ENV,
    revision:
      process.env.VERCEL_GITHUB_COMMIT_SHA || process.env.GITHUB_SHA || "local",
  },
});

/**
 * Context for logging operations
 */
export interface LogContext {
  /** Unique request ID for tracing */
  requestId?: string;
  /** User ID for user-specific operations */
  userId?: string;
  /** Session ID for session tracking */
  sessionId?: string;
  /** API path for request logging */
  path?: string;
  /** HTTP method for request logging */
  method?: string;
  /** Response status code */
  statusCode?: number;
  /** Operation duration in milliseconds */
  duration?: number;
  /** Error object or message */
  error?: Error | string;
  /** Domain/category for the log (auth, api, database, security, etc.) */
  domain?: string;
  /** Additional context data */
  [key: string]: any;
}

// Request context storage (for tracking current request)
let currentRequestContext: { requestId?: string } = {};

/**
 * Set the current request context (used by middleware)
 * @internal
 */
export const setRequestContext = (context: { requestId: string }) => {
  currentRequestContext = context;
};

/**
 * Clear the current request context
 * @internal
 */
export const clearRequestContext = () => {
  currentRequestContext = {};
};

/**
 * Get the current request context
 */
export const getRequestContext = () => currentRequestContext;

/**
 * Enhanced logger with automatic request context injection
 *
 * @example
 * ```typescript
 * // Basic logging
 * log.info('User action completed', { userId: '123', action: 'purchase' })
 * log.error('Operation failed', { error: error.message })
 *
 * // Domain-specific logging with context
 * log.info('User logged in', { domain: 'auth', userId: '123', method: 'email' })
 * log.info('Database query', { domain: 'database', table: 'users', operation: 'SELECT', duration: 45 })
 * log.warn('Suspicious activity', { domain: 'security', userId: '123', activity: 'multiple_failed_logins' })
 *
 * // API logging (automatically includes request context when available)
 * log.info('API request processed', { domain: 'api', path: '/api/users', statusCode: 200 })
 * ```
 */
export const log = {
  /**
   * Log debug information (development only)
   * @param message - The log message
   * @param context - Additional context data
   */
  debug: (message: string, context?: LogContext) => {
    baseLogger.debug({ ...currentRequestContext, ...context }, message);
  },

  /**
   * Log informational messages
   * @param message - The log message
   * @param context - Additional context data
   */
  info: (message: string, context?: LogContext) => {
    baseLogger.info({ ...currentRequestContext, ...context }, message);
  },

  /**
   * Log warning messages
   * @param message - The log message
   * @param context - Additional context data
   */
  warn: (message: string, context?: LogContext) => {
    baseLogger.warn({ ...currentRequestContext, ...context }, message);
  },

  /**
   * Log error messages
   * @param message - The log message
   * @param context - Additional context data
   */
  error: (message: string, context?: LogContext) => {
    baseLogger.error({ ...currentRequestContext, ...context }, message);
  },
};

/**
 * Generate a unique request ID
 * @returns A unique identifier for request tracing
 */
export const generateRequestId = () => nanoid(10);

/**
 * Helper functions for common logging patterns
 *
 * @example
 * ```typescript
 * // Authentication logging
 * logAuth.login('user-123', 'email')
 * logAuth.failed('user@example.com', 'invalid_password')
 *
 * // API logging
 * logApi.request('/api/users', 'GET', 'user-123')
 * logApi.response('/api/users', 'GET', 200, 150)
 * logApi.error('/api/users', 'POST', new Error('Validation failed'))
 *
 * // Database logging
 * logDb.query('users', 'SELECT', 45)
 * logDb.error('orders', 'INSERT', new Error('Constraint violation'))
 *
 * // Security logging
 * logSecurity.suspicious('user-123', 'multiple_failed_logins', { attempts: 5 })
 * logSecurity.rateLimit('192.168.1.1', '/api/auth/login')
 * ```
 */
export const logAuth = {
  /** Log successful user login */
  login: (userId: string, method: string) =>
    log.info("User logged in", {
      domain: "auth",
      userId,
      method,
      action: "login",
    }),

  /** Log user logout */
  logout: (userId: string) =>
    log.info("User logged out", { domain: "auth", userId, action: "logout" }),

  /** Log user signup */
  signup: (userId: string, email: string) =>
    log.info("User signed up", {
      domain: "auth",
      userId,
      email,
      action: "signup",
    }),

  /** Log failed authentication */
  failed: (email: string, reason: string) =>
    log.warn("Authentication failed", {
      domain: "auth",
      email,
      reason,
      action: "auth_failed",
    }),
};

export const logApi = {
  /** Log API request */
  request: (path: string, method: string, userId?: string) =>
    log.info("API request", {
      domain: "api",
      path,
      method,
      userId,
      action: "api_request",
    }),

  /** Log API response */
  response: (
    path: string,
    method: string,
    statusCode: number,
    duration: number,
  ) =>
    log.info("API response", {
      domain: "api",
      path,
      method,
      statusCode,
      duration,
      action: "api_response",
    }),

  /** Log API error */
  error: (path: string, method: string, error: Error, userId?: string) =>
    log.error("API error", {
      domain: "api",
      path,
      method,
      error: error.message,
      stack: error.stack,
      userId,
      action: "api_error",
    }),
};

export const logDb = {
  /** Log database query */
  query: (table: string, operation: string, duration?: number) =>
    log.debug("Database query", {
      domain: "database",
      table,
      operation,
      duration,
      action: "db_query",
    }),

  /** Log database error */
  error: (table: string, operation: string, error: Error) =>
    log.error("Database error", {
      domain: "database",
      table,
      operation,
      error: error.message,
      action: "db_error",
    }),
};

export const logSecurity = {
  /** Log suspicious activity */
  suspicious: (userId: string, activity: string, details: any) =>
    log.warn("Suspicious activity detected", {
      domain: "security",
      userId,
      activity,
      details,
      action: "security_alert",
    }),

  /** Log rate limit exceeded */
  rateLimit: (ip: string, path: string) =>
    log.warn("Rate limit exceeded", {
      domain: "security",
      ip,
      path,
      action: "rate_limit_exceeded",
    }),
};

// Export the base logger for advanced usage
export { baseLogger };
export default log;
