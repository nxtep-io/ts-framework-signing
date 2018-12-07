import { BaseRequest, BaseResponse, HttpCode, HttpError } from "ts-framework";
import { Logger, LoggerInstance } from "ts-framework-common";
import { generateSignaturePayload, parseHeaders } from "./util";

export type SigningMiddleware = (req: BaseRequest, res: BaseResponse, next: Function) => Promise<void>;

export type SecretMiddleware = (req: BaseRequest, res: BaseResponse) => Promise<string>;

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
  signedBodyMethods?: ('POST' | 'PUT')[]
}

export default class Signing {
  protected readonly logger: LoggerInstance;
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
   * An express middleware for handling signed requests.
   * 
   * @param {SigningOptions & {secret: string}} options The signing middleware options
   * @param {string|SecretMiddleware} options.secret A constant string or an async function to get the secret from request
   */
  public static middleware(options: SigningOptions): SigningMiddleware {
    // Return the built express middleware
    return new Signing(options).build();
  }

  /**
   * Gets the secret for signing based on request and response.
   */
  protected async secret(req: BaseRequest, res: BaseResponse): Promise<string> {
    let secret = this.options.secret as SecretMiddleware;

    // Ensure secret is a promise to a string
    if (typeof this.options.secret === typeof 'string') {
      secret = async () => (this.options.secret as string);
    }

    return secret(req, res);
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
      const secret = await this.secret(req, res);
      const computedSignature = generateSignaturePayload(req, secret, this.options.signedBodyMethods);

      // Validate the request signature
      if (signature && signature === computedSignature) {
        return next();
      }

      // Incorrect request signature
      throw new HttpError("Invalid request signature: incorrect format", HttpCode.Client.BAD_REQUEST);
    }
  }
}
