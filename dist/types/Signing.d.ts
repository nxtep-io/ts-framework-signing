import { BaseRequest, BaseResponse } from "ts-framework";
import { Logger } from "ts-framework-common";
export declare type SigningMiddleware = (req: BaseRequest, res: BaseResponse, next: Function) => Promise<void>;
export declare type SecretMiddleware = (req: BaseRequest, res: BaseResponse) => Promise<string>;
export interface SigningOptions {
    /**
     * An async function to get the secret to sign this request with.
     */
    secret: SecretMiddleware;
    /**
     * The signing middleware logger instance, for verbose and debugging.
     */
    logger?: Logger;
    /**
     * The max timeout between the signed timestamp and the time of verification, in ms. Defaults to `30000 ms`.
     */
    maxTimeout?: number;
    /**
     * The list of HTTP Methods with full body signing verification. Defaults to `['POST', 'PUT']`.
     */
    signedBodyMethods?: ('POST' | 'PUT')[];
}
export default class Signing {
    protected readonly logger: Logger;
    protected readonly options: SigningOptions;
    protected constructor(options: SigningOptions);
    /**
     * Builds the express middleware for signing the requests.
     * This is an internal method, should not be called directly.
     */
    protected build(): SigningMiddleware;
    /**
     * An express middleware for handling signed requests.
     *
     * @param options The signing middleware options
     * @param options.secret A constant string or an async function to get the secret from request
     */
    static middleware(options: SigningOptions & {
        secret: string;
    }): SigningMiddleware;
}
