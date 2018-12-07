import { BaseRequest, BaseResponse } from "ts-framework";
import { LoggerInstance } from "ts-framework-common";
export declare type SigningMiddleware = (req: BaseRequest, res: BaseResponse, next: Function) => Promise<void>;
export declare type SecretMiddleware = (req: BaseRequest, res: BaseResponse) => Promise<string>;
export interface SigningOptions {
    /**
     * An async function to get the secret to sign this request with.
     */
    secret: string | SecretMiddleware;
    /**
     * The signing middleware logger instance, for verbose and debugging.
     */
    logger?: LoggerInstance;
    /**
     * The max timeout between the signed timestamp and the time of verification, in ms. Defaults to `30000 ms`.
     */
    maxTimeout?: number;
    /**
     * The list of HTTP Methods with full body signing verification. Works with `['POST', 'PUT']`, defaults to both.
     */
    signedBodyMethods?: ('POST' | 'PUT')[];
}
export default class Signing {
    protected readonly logger: LoggerInstance;
    protected readonly options: SigningOptions;
    protected constructor(options: SigningOptions);
    /**
     * An express middleware for handling signed requests.
     *
     * @param {SigningOptions & {secret: string}} options The signing middleware options
     * @param {string|SecretMiddleware} options.secret A constant string or an async function to get the secret from request
     */
    static middleware(options: SigningOptions): SigningMiddleware;
    /**
     * Gets the secret for signing based on request and response.
     */
    protected secret(req: BaseRequest, res: BaseResponse): Promise<string>;
    /**
     * Builds the express middleware for signing the requests.
     * This is an internal method, should not be called directly.
     */
    protected build(): SigningMiddleware;
}
