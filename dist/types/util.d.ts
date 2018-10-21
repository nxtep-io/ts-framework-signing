import { BaseRequest } from "ts-framework";
export declare const MAX_TIMESTAMP_TIMEOUT = 60000;
/**
 * Parse request headers for checking its signature.
 *
 * @param req The base request
 */
export declare const parseHeaders: (req: BaseRequest) => {
    timestamp?: number;
    signature: string;
};
/**
 * Generate a HMAC SHA256 signature from request payload and secret string.
 *
 * @param req The base request
 * @param secret The secret to be used in the encryption
 */
export declare const generateSignaturePayload: (req: BaseRequest, secret: string) => string;
