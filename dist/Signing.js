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
            const computedSignature = util_1.generateSignaturePayload(req, yield this.options.secret(req, res), this.options.signedBodyMethods);
            // Validate the request signature
            if (signature && signature === computedSignature) {
                return next();
            }
            // Incorrect request signature
            throw new ts_framework_1.HttpError("Invalid request signature: incorrect format", ts_framework_1.HttpCode.Client.BAD_REQUEST);
        });
    }
    /**
     * An express middleware for handling signed requests.
     *
     * @param options The signing middleware options
     * @param options.secret A constant string or an async function to get the secret from request
     */
    static middleware(options) {
        let secret = options.secret;
        // Ensure secret is a promise to a string
        if (typeof options.secret === typeof 'string') {
            secret = () => __awaiter(this, void 0, void 0, function* () { return options.secret; });
        }
        // Return the built express middleware
        return new Signing(Object.assign({}, options, { secret })).build();
    }
}
exports.default = Signing;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2lnbmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9TaWduaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQ0FBOEU7QUFDOUUsNkRBQTZDO0FBQzdDLGlDQUFnRTtBQXlCaEU7SUFJRSxZQUFzQixPQUF1QjtRQUMzQyxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksNEJBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyRCxJQUFJLENBQUMsT0FBTyxxQkFDUCxPQUFPLElBQ1YsVUFBVSxFQUFFLE9BQU8sQ0FBQyxVQUFVLElBQUksS0FBSyxFQUN2QyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsaUJBQWlCLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEdBQ2hFLENBQUE7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ08sS0FBSztRQUNiLDBDQUEwQztRQUMxQyxPQUFPLENBQU8sR0FBZ0IsRUFBRSxHQUFpQixFQUFFLElBQWdCLEVBQWlCLEVBQUU7WUFDcEYsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsR0FBRyxtQkFBWSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRTVFLHNDQUFzQztZQUN0QyxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNkLE1BQU0sSUFBSSx3QkFBUyxDQUFDLHlEQUF5RCxFQUFFLHVCQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQzdHO1lBRUQsMENBQTBDO1lBQzFDLE1BQU0saUJBQWlCLEdBQUcsK0JBQXdCLENBQUMsR0FBRyxFQUFFLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUU3SCxpQ0FBaUM7WUFDakMsSUFBSSxTQUFTLElBQUksU0FBUyxLQUFLLGlCQUFpQixFQUFFO2dCQUNoRCxPQUFPLElBQUksRUFBRSxDQUFDO2FBQ2Y7WUFFRCw4QkFBOEI7WUFDOUIsTUFBTSxJQUFJLHdCQUFTLENBQUMsNkNBQTZDLEVBQUUsdUJBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbEcsQ0FBQyxDQUFBLENBQUE7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQTRDO1FBQ25FLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUEwQixDQUFDO1FBRWhELHlDQUF5QztRQUN6QyxJQUFJLE9BQU8sT0FBTyxDQUFDLE1BQU0sS0FBSyxPQUFPLFFBQVEsRUFBRTtZQUM3QyxNQUFNLEdBQUcsR0FBUyxFQUFFLGdEQUFDLE9BQUMsT0FBTyxDQUFDLE1BQWlCLENBQUEsR0FBQSxDQUFDO1NBQ2pEO1FBRUQsc0NBQXNDO1FBQ3RDLE9BQU8sSUFBSSxPQUFPLG1CQUFNLE9BQU8sSUFBRSxNQUFNLElBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNyRCxDQUFDO0NBQ0Y7QUF6REQsMEJBeURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZVJlcXVlc3QsIEJhc2VSZXNwb25zZSwgSHR0cENvZGUsIEh0dHBFcnJvciB9IGZyb20gXCJ0cy1mcmFtZXdvcmtcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZVNpZ25hdHVyZVBheWxvYWQsIHBhcnNlSGVhZGVycyB9IGZyb20gXCIuL3V0aWxcIjtcblxuZXhwb3J0IHR5cGUgU2lnbmluZ01pZGRsZXdhcmUgPSAocmVxOiBCYXNlUmVxdWVzdCwgcmVzOiBCYXNlUmVzcG9uc2UsIG5leHQ6IEZ1bmN0aW9uKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG5leHBvcnQgdHlwZSBTZWNyZXRNaWRkbGV3YXJlID0gKHJlcTogQmFzZVJlcXVlc3QsIHJlczogQmFzZVJlc3BvbnNlKSA9PiBQcm9taXNlPHN0cmluZz47XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2lnbmluZ09wdGlvbnMge1xuICAvKipcbiAgICogQW4gYXN5bmMgZnVuY3Rpb24gdG8gZ2V0IHRoZSBzZWNyZXQgdG8gc2lnbiB0aGlzIHJlcXVlc3Qgd2l0aC5cbiAgICovXG4gIHNlY3JldDogU2VjcmV0TWlkZGxld2FyZTtcbiAgLyoqXG4gICAqIFRoZSBzaWduaW5nIG1pZGRsZXdhcmUgbG9nZ2VyIGluc3RhbmNlLCBmb3IgdmVyYm9zZSBhbmQgZGVidWdnaW5nLlxuICAgKi9cbiAgbG9nZ2VyPzogTG9nZ2VyO1xuICAvKipcbiAgICogVGhlIG1heCB0aW1lb3V0IGJldHdlZW4gdGhlIHNpZ25lZCB0aW1lc3RhbXAgYW5kIHRoZSB0aW1lIG9mIHZlcmlmaWNhdGlvbiwgaW4gbXMuIERlZmF1bHRzIHRvIGAzMDAwMCBtc2AuXG4gICAqL1xuICBtYXhUaW1lb3V0PzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIGxpc3Qgb2YgSFRUUCBNZXRob2RzIHdpdGggZnVsbCBib2R5IHNpZ25pbmcgdmVyaWZpY2F0aW9uLiBEZWZhdWx0cyB0byBgWydQT1NUJywgJ1BVVCddYC5cbiAgICovXG4gIHNpZ25lZEJvZHlNZXRob2RzPzogKCdQT1NUJyB8ICdQVVQnKVtdXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpZ25pbmcge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgbG9nZ2VyOiBMb2dnZXI7XG4gIHByb3RlY3RlZCByZWFkb25seSBvcHRpb25zOiBTaWduaW5nT3B0aW9ucztcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3Iob3B0aW9uczogU2lnbmluZ09wdGlvbnMpIHtcbiAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyIHx8IExvZ2dlci5nZXRJbnN0YW5jZSgpO1xuICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtYXhUaW1lb3V0OiBvcHRpb25zLm1heFRpbWVvdXQgfHwgMzAwMDAsXG4gICAgICBzaWduZWRCb2R5TWV0aG9kczogb3B0aW9ucy5zaWduZWRCb2R5TWV0aG9kcyB8fCBbJ1BPU1QnLCAnUFVUJ10sXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEJ1aWxkcyB0aGUgZXhwcmVzcyBtaWRkbGV3YXJlIGZvciBzaWduaW5nIHRoZSByZXF1ZXN0cy4gXG4gICAqIFRoaXMgaXMgYW4gaW50ZXJuYWwgbWV0aG9kLCBzaG91bGQgbm90IGJlIGNhbGxlZCBkaXJlY3RseS5cbiAgICovXG4gIHByb3RlY3RlZCBidWlsZCgpOiBTaWduaW5nTWlkZGxld2FyZSB7XG4gICAgLy8gUmV0dXJuIHRoZSBleHByZXNzIGludGVyZmFjZSBtaWRkbGV3YXJlXG4gICAgcmV0dXJuIGFzeW5jIChyZXE6IEJhc2VSZXF1ZXN0LCByZXM6IEJhc2VSZXNwb25zZSwgbmV4dDogKCkgPT4gdm9pZCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgY29uc3QgeyB0aW1lc3RhbXAsIHNpZ25hdHVyZSB9ID0gcGFyc2VIZWFkZXJzKHJlcSwgdGhpcy5vcHRpb25zLm1heFRpbWVvdXQpO1xuXG4gICAgICAvLyBSZXF1ZXN0IHRpbWVzdGFtcCBzaWduYXR1cmUgZXhwaXJlZFxuICAgICAgaWYgKCF0aW1lc3RhbXApIHtcbiAgICAgICAgdGhyb3cgbmV3IEh0dHBFcnJvcihcIkludmFsaWQgcmVxdWVzdCBzaWduYXR1cmU6IHRpbWVzdGFtcCBpbnZhbGlkIG9yIGV4cGlyZWRcIiwgSHR0cENvZGUuQ2xpZW50LkJBRF9SRVFVRVNUKTtcbiAgICAgIH1cblxuICAgICAgLy8gR2VuZXJhdGUgdGhlIGV4cGVjdGVkIHJlcXVlc3Qgc2lnbmF0dXJlXG4gICAgICBjb25zdCBjb21wdXRlZFNpZ25hdHVyZSA9IGdlbmVyYXRlU2lnbmF0dXJlUGF5bG9hZChyZXEsIGF3YWl0IHRoaXMub3B0aW9ucy5zZWNyZXQocmVxLCByZXMpLCB0aGlzLm9wdGlvbnMuc2lnbmVkQm9keU1ldGhvZHMpO1xuXG4gICAgICAvLyBWYWxpZGF0ZSB0aGUgcmVxdWVzdCBzaWduYXR1cmVcbiAgICAgIGlmIChzaWduYXR1cmUgJiYgc2lnbmF0dXJlID09PSBjb21wdXRlZFNpZ25hdHVyZSkge1xuICAgICAgICByZXR1cm4gbmV4dCgpO1xuICAgICAgfVxuXG4gICAgICAvLyBJbmNvcnJlY3QgcmVxdWVzdCBzaWduYXR1cmVcbiAgICAgIHRocm93IG5ldyBIdHRwRXJyb3IoXCJJbnZhbGlkIHJlcXVlc3Qgc2lnbmF0dXJlOiBpbmNvcnJlY3QgZm9ybWF0XCIsIEh0dHBDb2RlLkNsaWVudC5CQURfUkVRVUVTVCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFuIGV4cHJlc3MgbWlkZGxld2FyZSBmb3IgaGFuZGxpbmcgc2lnbmVkIHJlcXVlc3RzLlxuICAgKiBcbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIHNpZ25pbmcgbWlkZGxld2FyZSBvcHRpb25zXG4gICAqIEBwYXJhbSBvcHRpb25zLnNlY3JldCBBIGNvbnN0YW50IHN0cmluZyBvciBhbiBhc3luYyBmdW5jdGlvbiB0byBnZXQgdGhlIHNlY3JldCBmcm9tIHJlcXVlc3RcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgbWlkZGxld2FyZShvcHRpb25zOiBTaWduaW5nT3B0aW9ucyAmIHsgc2VjcmV0OiBzdHJpbmcgfSk6IFNpZ25pbmdNaWRkbGV3YXJlIHtcbiAgICBsZXQgc2VjcmV0ID0gb3B0aW9ucy5zZWNyZXQgYXMgU2VjcmV0TWlkZGxld2FyZTtcblxuICAgIC8vIEVuc3VyZSBzZWNyZXQgaXMgYSBwcm9taXNlIHRvIGEgc3RyaW5nXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLnNlY3JldCA9PT0gdHlwZW9mICdzdHJpbmcnKSB7XG4gICAgICBzZWNyZXQgPSBhc3luYyAoKSA9PiAob3B0aW9ucy5zZWNyZXQgYXMgc3RyaW5nKTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gdGhlIGJ1aWx0IGV4cHJlc3MgbWlkZGxld2FyZVxuICAgIHJldHVybiBuZXcgU2lnbmluZyh7IC4uLm9wdGlvbnMsIHNlY3JldCB9KS5idWlsZCgpO1xuICB9XG59XG4iXX0=