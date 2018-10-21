import { BaseRequest, BaseResponse, HttpCode, HttpError } from "ts-framework";
import { generateSignaturePayload, parseHeaders } from "./util";

export type SecretMiddleware = (req: BaseRequest, res: BaseResponse) => Promise<string>;

export interface SigningOptions {
  secret: string | SecretMiddleware;
}

export default class Signing {
  /**
   * An express middleware for handling signed requests.
   */
  public static middleware(options: SigningOptions) {
    let secret = options.secret as SecretMiddleware;

    // Ensure secret is a promise to a string
    if (typeof options.secret === typeof 'string') {
      secret = async () => (options.secret as string);
    }

    // Return the express interface middleware
    return async (req: BaseRequest, res: BaseResponse, next: () => void): Promise<void> => {
      const { timestamp, signature } = parseHeaders(req);

      // Request timestamp signature expired
      if (!timestamp) {
        throw new HttpError("Invalid request signature: timestamp invalid or expired", HttpCode.Client.BAD_REQUEST);
      }

      // Generate the expected request signature
      const computedSignature = generateSignaturePayload(req, await secret(req, res));

      // Validate the request signature
      if (signature && signature === computedSignature) {
        return next();
      }

      // Incorrect request signature
      throw new HttpError("Invalid request signature: incorrect format", HttpCode.Client.BAD_REQUEST);
    }
  }
}
