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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2lnbmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9TaWduaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQ0FBOEU7QUFDOUUsNkRBQTZEO0FBQzdELGlDQUFnRTtBQXlCaEUsTUFBcUIsT0FBTztJQUkxQixZQUFzQixPQUF1QjtRQUMzQyxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksNEJBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyRCxJQUFJLENBQUMsT0FBTyxxQkFDUCxPQUFPLElBQ1YsVUFBVSxFQUFFLE9BQU8sQ0FBQyxVQUFVLElBQUksS0FBSyxFQUN2QyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsaUJBQWlCLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEdBQ2hFLENBQUE7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQXVCO1FBQzlDLHNDQUFzQztRQUN0QyxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7T0FFRztJQUNhLE1BQU0sQ0FBQyxHQUFnQixFQUFFLEdBQWlCOztZQUN4RCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQTBCLENBQUM7WUFFckQseUNBQXlDO1lBQ3pDLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxPQUFPLFFBQVEsRUFBRTtnQkFDbEQsTUFBTSxHQUFHLEdBQVMsRUFBRSxnREFBQyxPQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBaUIsQ0FBQSxHQUFBLENBQUM7YUFDdEQ7WUFFRCxPQUFPLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDMUIsQ0FBQztLQUFBO0lBRUQ7OztPQUdHO0lBQ08sS0FBSztRQUNiLDBDQUEwQztRQUMxQyxPQUFPLENBQU8sR0FBZ0IsRUFBRSxHQUFpQixFQUFFLElBQWdCLEVBQWlCLEVBQUU7WUFDcEYsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsR0FBRyxtQkFBWSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRTVFLHNDQUFzQztZQUN0QyxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNkLE1BQU0sSUFBSSx3QkFBUyxDQUFDLHlEQUF5RCxFQUFFLHVCQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQzdHO1lBRUQsMENBQTBDO1lBQzFDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDM0MsTUFBTSxpQkFBaUIsR0FBRywrQkFBd0IsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUVoRyxpQ0FBaUM7WUFDakMsSUFBSSxTQUFTLElBQUksU0FBUyxLQUFLLGlCQUFpQixFQUFFO2dCQUNoRCxPQUFPLElBQUksRUFBRSxDQUFDO2FBQ2Y7WUFFRCw4QkFBOEI7WUFDOUIsTUFBTSxJQUFJLHdCQUFTLENBQUMsNkNBQTZDLEVBQUUsdUJBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbEcsQ0FBQyxDQUFBLENBQUE7SUFDSCxDQUFDO0NBQ0Y7QUFqRUQsMEJBaUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZVJlcXVlc3QsIEJhc2VSZXNwb25zZSwgSHR0cENvZGUsIEh0dHBFcnJvciB9IGZyb20gXCJ0cy1mcmFtZXdvcmtcIjtcbmltcG9ydCB7IExvZ2dlciwgTG9nZ2VySW5zdGFuY2UgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0IHsgZ2VuZXJhdGVTaWduYXR1cmVQYXlsb2FkLCBwYXJzZUhlYWRlcnMgfSBmcm9tIFwiLi91dGlsXCI7XG5cbmV4cG9ydCB0eXBlIFNpZ25pbmdNaWRkbGV3YXJlID0gKHJlcTogQmFzZVJlcXVlc3QsIHJlczogQmFzZVJlc3BvbnNlLCBuZXh0OiBGdW5jdGlvbikgPT4gUHJvbWlzZTx2b2lkPjtcblxuZXhwb3J0IHR5cGUgU2VjcmV0TWlkZGxld2FyZSA9IChyZXE6IEJhc2VSZXF1ZXN0LCByZXM6IEJhc2VSZXNwb25zZSkgPT4gUHJvbWlzZTxzdHJpbmc+O1xuXG5leHBvcnQgaW50ZXJmYWNlIFNpZ25pbmdPcHRpb25zIHtcbiAgLyoqXG4gICAqIEFuIGFzeW5jIGZ1bmN0aW9uIHRvIGdldCB0aGUgc2VjcmV0IHRvIHNpZ24gdGhpcyByZXF1ZXN0IHdpdGguXG4gICAqL1xuICBzZWNyZXQ6IHN0cmluZyB8IFNlY3JldE1pZGRsZXdhcmU7XG4gIC8qKlxuICAgKiBUaGUgc2lnbmluZyBtaWRkbGV3YXJlIGxvZ2dlciBpbnN0YW5jZSwgZm9yIHZlcmJvc2UgYW5kIGRlYnVnZ2luZy5cbiAgICovXG4gIGxvZ2dlcj86IExvZ2dlckluc3RhbmNlO1xuICAvKipcbiAgICogVGhlIG1heCB0aW1lb3V0IGJldHdlZW4gdGhlIHNpZ25lZCB0aW1lc3RhbXAgYW5kIHRoZSB0aW1lIG9mIHZlcmlmaWNhdGlvbiwgaW4gbXMuIERlZmF1bHRzIHRvIGAzMDAwMCBtc2AuXG4gICAqL1xuICBtYXhUaW1lb3V0PzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIGxpc3Qgb2YgSFRUUCBNZXRob2RzIHdpdGggZnVsbCBib2R5IHNpZ25pbmcgdmVyaWZpY2F0aW9uLiBXb3JrcyB3aXRoIGBbJ1BPU1QnLCAnUFVUJ11gLCBkZWZhdWx0cyB0byBib3RoLlxuICAgKi9cbiAgc2lnbmVkQm9keU1ldGhvZHM/OiAoJ1BPU1QnIHwgJ1BVVCcpW11cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2lnbmluZyB7XG4gIHByb3RlY3RlZCByZWFkb25seSBsb2dnZXI6IExvZ2dlckluc3RhbmNlO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgb3B0aW9uczogU2lnbmluZ09wdGlvbnM7XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFNpZ25pbmdPcHRpb25zKSB7XG4gICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBMb2dnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgbWF4VGltZW91dDogb3B0aW9ucy5tYXhUaW1lb3V0IHx8IDMwMDAwLFxuICAgICAgc2lnbmVkQm9keU1ldGhvZHM6IG9wdGlvbnMuc2lnbmVkQm9keU1ldGhvZHMgfHwgWydQT1NUJywgJ1BVVCddLFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBbiBleHByZXNzIG1pZGRsZXdhcmUgZm9yIGhhbmRsaW5nIHNpZ25lZCByZXF1ZXN0cy5cbiAgICogXG4gICAqIEBwYXJhbSB7U2lnbmluZ09wdGlvbnMgJiB7c2VjcmV0OiBzdHJpbmd9fSBvcHRpb25zIFRoZSBzaWduaW5nIG1pZGRsZXdhcmUgb3B0aW9uc1xuICAgKiBAcGFyYW0ge3N0cmluZ3xTZWNyZXRNaWRkbGV3YXJlfSBvcHRpb25zLnNlY3JldCBBIGNvbnN0YW50IHN0cmluZyBvciBhbiBhc3luYyBmdW5jdGlvbiB0byBnZXQgdGhlIHNlY3JldCBmcm9tIHJlcXVlc3RcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgbWlkZGxld2FyZShvcHRpb25zOiBTaWduaW5nT3B0aW9ucyk6IFNpZ25pbmdNaWRkbGV3YXJlIHtcbiAgICAvLyBSZXR1cm4gdGhlIGJ1aWx0IGV4cHJlc3MgbWlkZGxld2FyZVxuICAgIHJldHVybiBuZXcgU2lnbmluZyhvcHRpb25zKS5idWlsZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHNlY3JldCBmb3Igc2lnbmluZyBiYXNlZCBvbiByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAgICovXG4gIHByb3RlY3RlZCBhc3luYyBzZWNyZXQocmVxOiBCYXNlUmVxdWVzdCwgcmVzOiBCYXNlUmVzcG9uc2UpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGxldCBzZWNyZXQgPSB0aGlzLm9wdGlvbnMuc2VjcmV0IGFzIFNlY3JldE1pZGRsZXdhcmU7XG5cbiAgICAvLyBFbnN1cmUgc2VjcmV0IGlzIGEgcHJvbWlzZSB0byBhIHN0cmluZ1xuICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLnNlY3JldCA9PT0gdHlwZW9mICdzdHJpbmcnKSB7XG4gICAgICBzZWNyZXQgPSBhc3luYyAoKSA9PiAodGhpcy5vcHRpb25zLnNlY3JldCBhcyBzdHJpbmcpO1xuICAgIH1cblxuICAgIHJldHVybiBzZWNyZXQocmVxLCByZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEJ1aWxkcyB0aGUgZXhwcmVzcyBtaWRkbGV3YXJlIGZvciBzaWduaW5nIHRoZSByZXF1ZXN0cy4gXG4gICAqIFRoaXMgaXMgYW4gaW50ZXJuYWwgbWV0aG9kLCBzaG91bGQgbm90IGJlIGNhbGxlZCBkaXJlY3RseS5cbiAgICovXG4gIHByb3RlY3RlZCBidWlsZCgpOiBTaWduaW5nTWlkZGxld2FyZSB7XG4gICAgLy8gUmV0dXJuIHRoZSBleHByZXNzIGludGVyZmFjZSBtaWRkbGV3YXJlXG4gICAgcmV0dXJuIGFzeW5jIChyZXE6IEJhc2VSZXF1ZXN0LCByZXM6IEJhc2VSZXNwb25zZSwgbmV4dDogKCkgPT4gdm9pZCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgY29uc3QgeyB0aW1lc3RhbXAsIHNpZ25hdHVyZSB9ID0gcGFyc2VIZWFkZXJzKHJlcSwgdGhpcy5vcHRpb25zLm1heFRpbWVvdXQpO1xuXG4gICAgICAvLyBSZXF1ZXN0IHRpbWVzdGFtcCBzaWduYXR1cmUgZXhwaXJlZFxuICAgICAgaWYgKCF0aW1lc3RhbXApIHtcbiAgICAgICAgdGhyb3cgbmV3IEh0dHBFcnJvcihcIkludmFsaWQgcmVxdWVzdCBzaWduYXR1cmU6IHRpbWVzdGFtcCBpbnZhbGlkIG9yIGV4cGlyZWRcIiwgSHR0cENvZGUuQ2xpZW50LkJBRF9SRVFVRVNUKTtcbiAgICAgIH1cblxuICAgICAgLy8gR2VuZXJhdGUgdGhlIGV4cGVjdGVkIHJlcXVlc3Qgc2lnbmF0dXJlXG4gICAgICBjb25zdCBzZWNyZXQgPSBhd2FpdCB0aGlzLnNlY3JldChyZXEsIHJlcyk7XG4gICAgICBjb25zdCBjb21wdXRlZFNpZ25hdHVyZSA9IGdlbmVyYXRlU2lnbmF0dXJlUGF5bG9hZChyZXEsIHNlY3JldCwgdGhpcy5vcHRpb25zLnNpZ25lZEJvZHlNZXRob2RzKTtcblxuICAgICAgLy8gVmFsaWRhdGUgdGhlIHJlcXVlc3Qgc2lnbmF0dXJlXG4gICAgICBpZiAoc2lnbmF0dXJlICYmIHNpZ25hdHVyZSA9PT0gY29tcHV0ZWRTaWduYXR1cmUpIHtcbiAgICAgICAgcmV0dXJuIG5leHQoKTtcbiAgICAgIH1cblxuICAgICAgLy8gSW5jb3JyZWN0IHJlcXVlc3Qgc2lnbmF0dXJlXG4gICAgICB0aHJvdyBuZXcgSHR0cEVycm9yKFwiSW52YWxpZCByZXF1ZXN0IHNpZ25hdHVyZTogaW5jb3JyZWN0IGZvcm1hdFwiLCBIdHRwQ29kZS5DbGllbnQuQkFEX1JFUVVFU1QpO1xuICAgIH1cbiAgfVxufVxuIl19