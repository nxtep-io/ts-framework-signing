import * as crypto from "crypto";
import { BaseRequest } from "ts-framework";

// TODO: Get from config
export const MAX_TIMESTAMP_TIMEOUT = 60000; // 1min

/**
 * Parse request headers for checking its signature.
 *
 * @param req The base request
 */
export const parseHeaders = (req: BaseRequest): { timestamp?: number; signature: string } => {
  const timestamp = req.headers["x-request-timestamp"] as string;
  const signature = req.headers["x-request-signature"] as string;
  const parsedTimestamp = timestamp ? parseInt(timestamp as string, 10) : undefined;

  // Incorrect request timestamp signature
  if (!timestamp || isNaN(parsedTimestamp)) {
    return { signature };
  }

  // Check if timestamp has already expired
  const hasExpired = parsedTimestamp < Date.now() - MAX_TIMESTAMP_TIMEOUT;

  return {
    signature,
    timestamp: !hasExpired ? parsedTimestamp : undefined
  };
};

/**
 * Generate a HMAC SHA256 signature from request payload and secret string.
 *
 * @param req The base request
 * @param secret The secret to be used in the encryption
 */
export const generateSignaturePayload = (req: BaseRequest, secret: string) => {
  const items = [req.method, req.url, req.headers["x-request-timestamp"]];

  if (req.method.toLowerCase() === "post" || req.method.toLowerCase() === "put") {
    // Add request body to signature
    items.push(JSON.stringify(req.body));
  }

  if (!secret) {
    throw new Error("Invalid computed signature secret");
  }

  return crypto
    .createHmac("sha256", secret)
    .update(items.join(","))
    .digest("hex");
};
