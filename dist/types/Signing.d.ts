import { BaseRequest, BaseResponse } from "ts-framework";
export declare type SecretMiddleware = (req: BaseRequest, res: BaseResponse) => Promise<string>;
export interface SigningOptions {
    secret: string | SecretMiddleware;
}
export default class Signing {
    /**
     * An express middleware for handling signed requests.
     */
    static middleware(options: SigningOptions): (req: BaseRequest, res: BaseResponse, next: () => void) => Promise<void>;
}
