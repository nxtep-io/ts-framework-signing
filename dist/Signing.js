"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts_framework_1 = require("ts-framework");
const ts_framework_common_1 = require("ts-framework-common");
const util_1 = require("./util");
class Signing {
    constructor(options) {
        this.logger = options.logger || ts_framework_common_1.Logger.getInstance();
        this.options = Object.assign({}, options, { maxTimeout: options.maxTimeout || 30000, signedBodyMethods: options.signedBodyMethods || ['POST', 'PUT'] });
    }
    /**
     * An express middleware for handling signed requests.
     *
     * @param {SigningOptions & {secret: string}} options The signing middleware options
     * @param {string|SecretMiddleware} options.secret A constant string or an async function to get the secret from request
     */
    static middleware(options) {
        // Return the built express middleware
        return new Signing(options).build();
    }
    /**
     * Gets the secret for signing based on request and response.
     */
    secret(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let secret = this.options.secret;
            // Ensure secret is a promise to a string
            if (typeof this.options.secret === typeof 'string') {
                secret = () => __awaiter(this, void 0, void 0, function* () { return this.options.secret; });
            }
            return secret(req, res);
        });
    }
    /**
     * Builds the express middleware for signing the requests.
     * This is an internal method, should not be called directly.
     */
    build() {
        // Return the express interface middleware
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { timestamp, signature } = util_1.parseHeaders(req, this.options.maxTimeout);
            // Request timestamp signature expired
            if (!timestamp) {
                throw new ts_framework_1.HttpError("Invalid request signature: timestamp invalid or expired", ts_framework_1.HttpCode.Client.BAD_REQUEST);
            }
            // Generate the expected request signature
            const secret = yield this.secret(req, res);
            const computedSignature = util_1.generateSignaturePayload(req, secret, this.options.signedBodyMethods);
            // Validate the request signature
            if (signature && signature === computedSignature) {
                return next();
            }
            // Incorrect request signature
            throw new ts_framework_1.HttpError("Invalid request signature: incorrect format", ts_framework_1.HttpCode.Client.BAD_REQUEST);
        });
    }
}
exports.default = Signing;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2lnbmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9TaWduaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQ0FBOEU7QUFDOUUsNkRBQTZDO0FBQzdDLGlDQUFnRTtBQXlCaEU7SUFJRSxZQUFzQixPQUF1QjtRQUMzQyxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksNEJBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyRCxJQUFJLENBQUMsT0FBTyxxQkFDUCxPQUFPLElBQ1YsVUFBVSxFQUFFLE9BQU8sQ0FBQyxVQUFVLElBQUksS0FBSyxFQUN2QyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsaUJBQWlCLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEdBQ2hFLENBQUE7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQXVCO1FBQzlDLHNDQUFzQztRQUN0QyxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7T0FFRztJQUNhLE1BQU0sQ0FBQyxHQUFnQixFQUFFLEdBQWlCOztZQUN4RCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQTBCLENBQUM7WUFFckQseUNBQXlDO1lBQ3pDLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxPQUFPLFFBQVEsRUFBRTtnQkFDbEQsTUFBTSxHQUFHLEdBQVMsRUFBRSxnREFBQyxPQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBaUIsQ0FBQSxHQUFBLENBQUM7YUFDdEQ7WUFFRCxPQUFPLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDMUIsQ0FBQztLQUFBO0lBRUQ7OztPQUdHO0lBQ08sS0FBSztRQUNiLDBDQUEwQztRQUMxQyxPQUFPLENBQU8sR0FBZ0IsRUFBRSxHQUFpQixFQUFFLElBQWdCLEVBQWlCLEVBQUU7WUFDcEYsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsR0FBRyxtQkFBWSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRTVFLHNDQUFzQztZQUN0QyxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNkLE1BQU0sSUFBSSx3QkFBUyxDQUFDLHlEQUF5RCxFQUFFLHVCQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQzdHO1lBRUQsMENBQTBDO1lBQzFDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDM0MsTUFBTSxpQkFBaUIsR0FBRywrQkFBd0IsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUVoRyxpQ0FBaUM7WUFDakMsSUFBSSxTQUFTLElBQUksU0FBUyxLQUFLLGlCQUFpQixFQUFFO2dCQUNoRCxPQUFPLElBQUksRUFBRSxDQUFDO2FBQ2Y7WUFFRCw4QkFBOEI7WUFDOUIsTUFBTSxJQUFJLHdCQUFTLENBQUMsNkNBQTZDLEVBQUUsdUJBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbEcsQ0FBQyxDQUFBLENBQUE7SUFDSCxDQUFDO0NBQ0Y7QUFqRUQsMEJBaUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZVJlcXVlc3QsIEJhc2VSZXNwb25zZSwgSHR0cENvZGUsIEh0dHBFcnJvciB9IGZyb20gXCJ0cy1mcmFtZXdvcmtcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZVNpZ25hdHVyZVBheWxvYWQsIHBhcnNlSGVhZGVycyB9IGZyb20gXCIuL3V0aWxcIjtcblxuZXhwb3J0IHR5cGUgU2lnbmluZ01pZGRsZXdhcmUgPSAocmVxOiBCYXNlUmVxdWVzdCwgcmVzOiBCYXNlUmVzcG9uc2UsIG5leHQ6IEZ1bmN0aW9uKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG5leHBvcnQgdHlwZSBTZWNyZXRNaWRkbGV3YXJlID0gKHJlcTogQmFzZVJlcXVlc3QsIHJlczogQmFzZVJlc3BvbnNlKSA9PiBQcm9taXNlPHN0cmluZz47XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2lnbmluZ09wdGlvbnMge1xuICAvKipcbiAgICogQW4gYXN5bmMgZnVuY3Rpb24gdG8gZ2V0IHRoZSBzZWNyZXQgdG8gc2lnbiB0aGlzIHJlcXVlc3Qgd2l0aC5cbiAgICovXG4gIHNlY3JldDogc3RyaW5nIHwgU2VjcmV0TWlkZGxld2FyZTtcbiAgLyoqXG4gICAqIFRoZSBzaWduaW5nIG1pZGRsZXdhcmUgbG9nZ2VyIGluc3RhbmNlLCBmb3IgdmVyYm9zZSBhbmQgZGVidWdnaW5nLlxuICAgKi9cbiAgbG9nZ2VyPzogTG9nZ2VyO1xuICAvKipcbiAgICogVGhlIG1heCB0aW1lb3V0IGJldHdlZW4gdGhlIHNpZ25lZCB0aW1lc3RhbXAgYW5kIHRoZSB0aW1lIG9mIHZlcmlmaWNhdGlvbiwgaW4gbXMuIERlZmF1bHRzIHRvIGAzMDAwMCBtc2AuXG4gICAqL1xuICBtYXhUaW1lb3V0PzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIGxpc3Qgb2YgSFRUUCBNZXRob2RzIHdpdGggZnVsbCBib2R5IHNpZ25pbmcgdmVyaWZpY2F0aW9uLiBEZWZhdWx0cyB0byBgWydQT1NUJywgJ1BVVCddYC5cbiAgICovXG4gIHNpZ25lZEJvZHlNZXRob2RzPzogKCdQT1NUJyB8ICdQVVQnKVtdXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpZ25pbmcge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgbG9nZ2VyOiBMb2dnZXI7XG4gIHByb3RlY3RlZCByZWFkb25seSBvcHRpb25zOiBTaWduaW5nT3B0aW9ucztcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3Iob3B0aW9uczogU2lnbmluZ09wdGlvbnMpIHtcbiAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyIHx8IExvZ2dlci5nZXRJbnN0YW5jZSgpO1xuICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtYXhUaW1lb3V0OiBvcHRpb25zLm1heFRpbWVvdXQgfHwgMzAwMDAsXG4gICAgICBzaWduZWRCb2R5TWV0aG9kczogb3B0aW9ucy5zaWduZWRCb2R5TWV0aG9kcyB8fCBbJ1BPU1QnLCAnUFVUJ10sXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFuIGV4cHJlc3MgbWlkZGxld2FyZSBmb3IgaGFuZGxpbmcgc2lnbmVkIHJlcXVlc3RzLlxuICAgKiBcbiAgICogQHBhcmFtIHtTaWduaW5nT3B0aW9ucyAmIHtzZWNyZXQ6IHN0cmluZ319IG9wdGlvbnMgVGhlIHNpZ25pbmcgbWlkZGxld2FyZSBvcHRpb25zXG4gICAqIEBwYXJhbSB7c3RyaW5nfFNlY3JldE1pZGRsZXdhcmV9IG9wdGlvbnMuc2VjcmV0IEEgY29uc3RhbnQgc3RyaW5nIG9yIGFuIGFzeW5jIGZ1bmN0aW9uIHRvIGdldCB0aGUgc2VjcmV0IGZyb20gcmVxdWVzdFxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBtaWRkbGV3YXJlKG9wdGlvbnM6IFNpZ25pbmdPcHRpb25zKTogU2lnbmluZ01pZGRsZXdhcmUge1xuICAgIC8vIFJldHVybiB0aGUgYnVpbHQgZXhwcmVzcyBtaWRkbGV3YXJlXG4gICAgcmV0dXJuIG5ldyBTaWduaW5nKG9wdGlvbnMpLmJ1aWxkKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgc2VjcmV0IGZvciBzaWduaW5nIGJhc2VkIG9uIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICAgKi9cbiAgcHJvdGVjdGVkIGFzeW5jIHNlY3JldChyZXE6IEJhc2VSZXF1ZXN0LCByZXM6IEJhc2VSZXNwb25zZSk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgbGV0IHNlY3JldCA9IHRoaXMub3B0aW9ucy5zZWNyZXQgYXMgU2VjcmV0TWlkZGxld2FyZTtcblxuICAgIC8vIEVuc3VyZSBzZWNyZXQgaXMgYSBwcm9taXNlIHRvIGEgc3RyaW5nXG4gICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMuc2VjcmV0ID09PSB0eXBlb2YgJ3N0cmluZycpIHtcbiAgICAgIHNlY3JldCA9IGFzeW5jICgpID0+ICh0aGlzLm9wdGlvbnMuc2VjcmV0IGFzIHN0cmluZyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlY3JldChyZXEsIHJlcyk7XG4gIH1cblxuICAvKipcbiAgICogQnVpbGRzIHRoZSBleHByZXNzIG1pZGRsZXdhcmUgZm9yIHNpZ25pbmcgdGhlIHJlcXVlc3RzLiBcbiAgICogVGhpcyBpcyBhbiBpbnRlcm5hbCBtZXRob2QsIHNob3VsZCBub3QgYmUgY2FsbGVkIGRpcmVjdGx5LlxuICAgKi9cbiAgcHJvdGVjdGVkIGJ1aWxkKCk6IFNpZ25pbmdNaWRkbGV3YXJlIHtcbiAgICAvLyBSZXR1cm4gdGhlIGV4cHJlc3MgaW50ZXJmYWNlIG1pZGRsZXdhcmVcbiAgICByZXR1cm4gYXN5bmMgKHJlcTogQmFzZVJlcXVlc3QsIHJlczogQmFzZVJlc3BvbnNlLCBuZXh0OiAoKSA9PiB2b2lkKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICBjb25zdCB7IHRpbWVzdGFtcCwgc2lnbmF0dXJlIH0gPSBwYXJzZUhlYWRlcnMocmVxLCB0aGlzLm9wdGlvbnMubWF4VGltZW91dCk7XG5cbiAgICAgIC8vIFJlcXVlc3QgdGltZXN0YW1wIHNpZ25hdHVyZSBleHBpcmVkXG4gICAgICBpZiAoIXRpbWVzdGFtcCkge1xuICAgICAgICB0aHJvdyBuZXcgSHR0cEVycm9yKFwiSW52YWxpZCByZXF1ZXN0IHNpZ25hdHVyZTogdGltZXN0YW1wIGludmFsaWQgb3IgZXhwaXJlZFwiLCBIdHRwQ29kZS5DbGllbnQuQkFEX1JFUVVFU1QpO1xuICAgICAgfVxuXG4gICAgICAvLyBHZW5lcmF0ZSB0aGUgZXhwZWN0ZWQgcmVxdWVzdCBzaWduYXR1cmVcbiAgICAgIGNvbnN0IHNlY3JldCA9IGF3YWl0IHRoaXMuc2VjcmV0KHJlcSwgcmVzKTtcbiAgICAgIGNvbnN0IGNvbXB1dGVkU2lnbmF0dXJlID0gZ2VuZXJhdGVTaWduYXR1cmVQYXlsb2FkKHJlcSwgc2VjcmV0LCB0aGlzLm9wdGlvbnMuc2lnbmVkQm9keU1ldGhvZHMpO1xuXG4gICAgICAvLyBWYWxpZGF0ZSB0aGUgcmVxdWVzdCBzaWduYXR1cmVcbiAgICAgIGlmIChzaWduYXR1cmUgJiYgc2lnbmF0dXJlID09PSBjb21wdXRlZFNpZ25hdHVyZSkge1xuICAgICAgICByZXR1cm4gbmV4dCgpO1xuICAgICAgfVxuXG4gICAgICAvLyBJbmNvcnJlY3QgcmVxdWVzdCBzaWduYXR1cmVcbiAgICAgIHRocm93IG5ldyBIdHRwRXJyb3IoXCJJbnZhbGlkIHJlcXVlc3Qgc2lnbmF0dXJlOiBpbmNvcnJlY3QgZm9ybWF0XCIsIEh0dHBDb2RlLkNsaWVudC5CQURfUkVRVUVTVCk7XG4gICAgfVxuICB9XG59XG4iXX0=