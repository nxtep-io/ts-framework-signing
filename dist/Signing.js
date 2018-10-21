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
const util_1 = require("./util");
class Signing {
    /**
     * An express middleware for handling signed requests.
     */
    static middleware(options) {
        let secret = options.secret;
        // Ensure secret is a promise to a string
        if (typeof options.secret === typeof 'string') {
            secret = () => __awaiter(this, void 0, void 0, function* () { return options.secret; });
        }
        // Return the express interface middleware
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { timestamp, signature } = util_1.parseHeaders(req);
            // Request timestamp signature expired
            if (!timestamp) {
                throw new ts_framework_1.HttpError("Invalid request signature: timestamp invalid or expired", ts_framework_1.HttpCode.Client.BAD_REQUEST);
            }
            // Generate the expected request signature
            const computedSignature = util_1.generateSignaturePayload(req, yield secret(req, res));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2lnbmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9TaWduaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQ0FBOEU7QUFDOUUsaUNBQWdFO0FBUWhFO0lBQ0U7O09BRUc7SUFDSSxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQXVCO1FBQzlDLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUEwQixDQUFDO1FBRWhELHlDQUF5QztRQUN6QyxJQUFJLE9BQU8sT0FBTyxDQUFDLE1BQU0sS0FBSyxPQUFPLFFBQVEsRUFBRTtZQUM3QyxNQUFNLEdBQUcsR0FBUyxFQUFFLGdEQUFDLE9BQUMsT0FBTyxDQUFDLE1BQWlCLENBQUEsR0FBQSxDQUFDO1NBQ2pEO1FBRUQsMENBQTBDO1FBQzFDLE9BQU8sQ0FBTyxHQUFnQixFQUFFLEdBQWlCLEVBQUUsSUFBZ0IsRUFBaUIsRUFBRTtZQUNwRixNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxHQUFHLG1CQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFbkQsc0NBQXNDO1lBQ3RDLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2QsTUFBTSxJQUFJLHdCQUFTLENBQUMseURBQXlELEVBQUUsdUJBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDN0c7WUFFRCwwQ0FBMEM7WUFDMUMsTUFBTSxpQkFBaUIsR0FBRywrQkFBd0IsQ0FBQyxHQUFHLEVBQUUsTUFBTSxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFaEYsaUNBQWlDO1lBQ2pDLElBQUksU0FBUyxJQUFJLFNBQVMsS0FBSyxpQkFBaUIsRUFBRTtnQkFDaEQsT0FBTyxJQUFJLEVBQUUsQ0FBQzthQUNmO1lBRUQsOEJBQThCO1lBQzlCLE1BQU0sSUFBSSx3QkFBUyxDQUFDLDZDQUE2QyxFQUFFLHVCQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2xHLENBQUMsQ0FBQSxDQUFBO0lBQ0gsQ0FBQztDQUNGO0FBakNELDBCQWlDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VSZXF1ZXN0LCBCYXNlUmVzcG9uc2UsIEh0dHBDb2RlLCBIdHRwRXJyb3IgfSBmcm9tIFwidHMtZnJhbWV3b3JrXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZVNpZ25hdHVyZVBheWxvYWQsIHBhcnNlSGVhZGVycyB9IGZyb20gXCIuL3V0aWxcIjtcblxuZXhwb3J0IHR5cGUgU2VjcmV0TWlkZGxld2FyZSA9IChyZXE6IEJhc2VSZXF1ZXN0LCByZXM6IEJhc2VSZXNwb25zZSkgPT4gUHJvbWlzZTxzdHJpbmc+O1xuXG5leHBvcnQgaW50ZXJmYWNlIFNpZ25pbmdPcHRpb25zIHtcbiAgc2VjcmV0OiBzdHJpbmcgfCBTZWNyZXRNaWRkbGV3YXJlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaWduaW5nIHtcbiAgLyoqXG4gICAqIEFuIGV4cHJlc3MgbWlkZGxld2FyZSBmb3IgaGFuZGxpbmcgc2lnbmVkIHJlcXVlc3RzLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBtaWRkbGV3YXJlKG9wdGlvbnM6IFNpZ25pbmdPcHRpb25zKSB7XG4gICAgbGV0IHNlY3JldCA9IG9wdGlvbnMuc2VjcmV0IGFzIFNlY3JldE1pZGRsZXdhcmU7XG5cbiAgICAvLyBFbnN1cmUgc2VjcmV0IGlzIGEgcHJvbWlzZSB0byBhIHN0cmluZ1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5zZWNyZXQgPT09IHR5cGVvZiAnc3RyaW5nJykge1xuICAgICAgc2VjcmV0ID0gYXN5bmMgKCkgPT4gKG9wdGlvbnMuc2VjcmV0IGFzIHN0cmluZyk7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIHRoZSBleHByZXNzIGludGVyZmFjZSBtaWRkbGV3YXJlXG4gICAgcmV0dXJuIGFzeW5jIChyZXE6IEJhc2VSZXF1ZXN0LCByZXM6IEJhc2VSZXNwb25zZSwgbmV4dDogKCkgPT4gdm9pZCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgY29uc3QgeyB0aW1lc3RhbXAsIHNpZ25hdHVyZSB9ID0gcGFyc2VIZWFkZXJzKHJlcSk7XG5cbiAgICAgIC8vIFJlcXVlc3QgdGltZXN0YW1wIHNpZ25hdHVyZSBleHBpcmVkXG4gICAgICBpZiAoIXRpbWVzdGFtcCkge1xuICAgICAgICB0aHJvdyBuZXcgSHR0cEVycm9yKFwiSW52YWxpZCByZXF1ZXN0IHNpZ25hdHVyZTogdGltZXN0YW1wIGludmFsaWQgb3IgZXhwaXJlZFwiLCBIdHRwQ29kZS5DbGllbnQuQkFEX1JFUVVFU1QpO1xuICAgICAgfVxuXG4gICAgICAvLyBHZW5lcmF0ZSB0aGUgZXhwZWN0ZWQgcmVxdWVzdCBzaWduYXR1cmVcbiAgICAgIGNvbnN0IGNvbXB1dGVkU2lnbmF0dXJlID0gZ2VuZXJhdGVTaWduYXR1cmVQYXlsb2FkKHJlcSwgYXdhaXQgc2VjcmV0KHJlcSwgcmVzKSk7XG5cbiAgICAgIC8vIFZhbGlkYXRlIHRoZSByZXF1ZXN0IHNpZ25hdHVyZVxuICAgICAgaWYgKHNpZ25hdHVyZSAmJiBzaWduYXR1cmUgPT09IGNvbXB1dGVkU2lnbmF0dXJlKSB7XG4gICAgICAgIHJldHVybiBuZXh0KCk7XG4gICAgICB9XG5cbiAgICAgIC8vIEluY29ycmVjdCByZXF1ZXN0IHNpZ25hdHVyZVxuICAgICAgdGhyb3cgbmV3IEh0dHBFcnJvcihcIkludmFsaWQgcmVxdWVzdCBzaWduYXR1cmU6IGluY29ycmVjdCBmb3JtYXRcIiwgSHR0cENvZGUuQ2xpZW50LkJBRF9SRVFVRVNUKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==