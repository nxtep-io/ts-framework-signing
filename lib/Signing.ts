import { BaseRequest, BaseResponse, HttpCode, HttpError } from "ts-framework";
import { Logger } from "ts-framework-common";
import { generateSignaturePayload, parseHeaders } from "./util";

export type SigningMiddleware = (req: BaseRequest, res: BaseResponse, next: Function) => Promise<void>;

export type SecretMiddleware = (req: BaseRequest, res: BaseResponse) => Promise<string>;

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
  signedBodyMethods?: ('POST' | 'PUT')[]
}

export default class Signing {
  protected readonly logger: Logger;
  protected readonly options: SigningOptions;

  protected constructor(options: SigningOptions) {
    this.logger = options.logger || Logger.getInstance();
    this.options = {
      ...options,
      maxTimeout: options.maxTimeout || 30000,
      signedBodyMethods: options.signedBodyMethods || ['POST', 'PUT'],
    }
  }

  /**
   * Builds the express middleware for signing the requests. 
   * This is an internal method, should not be called directly.
   */
  protected build(): SigningMiddleware {
    // Return the express interface middleware
    return async (req: BaseRequest, res: BaseResponse, next: () => void): Promise<void> => {
      const { timestamp, signature } = parseHeaders(req, this.options.maxTimeout);

      // Request timestamp signature expired
      if (!timestamp) {
        throw new HttpError("Invalid request signature: timestamp invalid or expired", HttpCode.Client.BAD_REQUEST);
      }

      // Generate the expected request signature
      const computedSignature = generateSignaturePayload(req, await this.options.secret(req, res), this.options.signedBodyMethods);

      // Validate the request signature
      if (signature && signature === computedSignature) {
        return next();
      }

      // Incorrect request signature
      throw new HttpError("Invalid request signature: incorrect format", HttpCode.Client.BAD_REQUEST);
    }
  }

  /**
   * An express middleware for handling signed requests.
   * 
   * @param options The signing middleware options
   * @param options.secret A constant string or an async function to get the secret from request
   */
  public static middleware(options: SigningOptions & { secret: string }): SigningMiddleware {
    let secret = options.secret as SecretMiddleware;

    // Ensure secret is a promise to a string
    if (typeof options.secret === typeof 'string') {
      secret = async () => (options.secret as string);
    }

    // Return the built express middleware
    return new Signing({ ...options, secret }).build();
  }
}
