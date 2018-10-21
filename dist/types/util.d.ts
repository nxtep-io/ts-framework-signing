import { BaseRequest } from "ts-framework";
/**
 * Parse request headers for checking its signature.
 *
 * @param req The base request
 */
export declare const parseHeaders: (req: BaseRequest, timeout: number) => {
    timestamp?: number;
    signature: string;
};
/**
 * Generate a HMAC SHA256 signature from request payload and secret string.
 *
 * @param req The base request
 * @param secret The secret to be used in the encryption
 */
export declare const generateSignaturePayload: (req: BaseRequest, secret: string, signedBodyMethods: ("POST" | "PUT")[]) => string;
