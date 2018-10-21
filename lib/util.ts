import * as crypto from "crypto";
import { BaseRequest } from "ts-framework";

/**
 * Parse request headers for checking its signature.
 *
 * @param req The base request
 */
export const parseHeaders = (req: BaseRequest, timeout: number): { timestamp?: number; signature: string } => {
  const timestamp = req.headers["x-request-timestamp"] as string;
  const signature = req.headers["x-request-signature"] as string;
  const parsedTimestamp = timestamp ? parseInt(timestamp as string, 10) : undefined;

  // Incorrect request timestamp signature
  if (!timestamp || isNaN(parsedTimestamp)) {
    return { signature };
  }

  // Check if timestamp has already expired
  const hasExpired = parsedTimestamp < Date.now() - timeout;

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
export const generateSignaturePayload = (req: BaseRequest, secret: string, signedBodyMethods: ('POST' | 'PUT')[] = []) => {
  const items = [req.method, req.url, req.headers["x-request-timestamp"]];
  const shouldVerifyBody = signedBodyMethods.indexOf(req.method.toUpperCase() as any) >= 0;

  if (shouldVerifyBody) {
    // Add request body to signature
    items.push(JSON.stringify(req.body));
  }

  if (!secret) {
    throw new Error("Invalid computed signature secret");
  }

  return crypto.createHmac("sha256", secret).update(items.join(",")).digest("hex");
};
