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
            secret = Promise.resolve(options.secret);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2lnbmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9TaWduaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQ0FBOEU7QUFDOUUsaUNBQWdFO0FBUWhFO0lBQ0U7O09BRUc7SUFDSSxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQXVCO1FBQzlDLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUEwQixDQUFDO1FBRWhELHlDQUF5QztRQUN6QyxJQUFJLE9BQU8sT0FBTyxDQUFDLE1BQU0sS0FBSyxPQUFPLFFBQVEsRUFBRTtZQUM3QyxNQUFNLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFRLENBQUM7U0FDakQ7UUFFRCwwQ0FBMEM7UUFDMUMsT0FBTyxDQUFPLEdBQWdCLEVBQUUsR0FBaUIsRUFBRSxJQUFnQixFQUFpQixFQUFFO1lBQ3BGLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEdBQUcsbUJBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVuRCxzQ0FBc0M7WUFDdEMsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDZCxNQUFNLElBQUksd0JBQVMsQ0FBQyx5REFBeUQsRUFBRSx1QkFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUM3RztZQUVELDBDQUEwQztZQUMxQyxNQUFNLGlCQUFpQixHQUFHLCtCQUF3QixDQUFDLEdBQUcsRUFBRSxNQUFNLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUVoRixpQ0FBaUM7WUFDakMsSUFBSSxTQUFTLElBQUksU0FBUyxLQUFLLGlCQUFpQixFQUFFO2dCQUNoRCxPQUFPLElBQUksRUFBRSxDQUFDO2FBQ2Y7WUFFRCw4QkFBOEI7WUFDOUIsTUFBTSxJQUFJLHdCQUFTLENBQUMsNkNBQTZDLEVBQUUsdUJBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbEcsQ0FBQyxDQUFBLENBQUE7SUFDSCxDQUFDO0NBQ0Y7QUFqQ0QsMEJBaUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZVJlcXVlc3QsIEJhc2VSZXNwb25zZSwgSHR0cENvZGUsIEh0dHBFcnJvciB9IGZyb20gXCJ0cy1mcmFtZXdvcmtcIjtcbmltcG9ydCB7IGdlbmVyYXRlU2lnbmF0dXJlUGF5bG9hZCwgcGFyc2VIZWFkZXJzIH0gZnJvbSBcIi4vdXRpbFwiO1xuXG5leHBvcnQgdHlwZSBTZWNyZXRNaWRkbGV3YXJlID0gKHJlcTogQmFzZVJlcXVlc3QsIHJlczogQmFzZVJlc3BvbnNlKSA9PiBQcm9taXNlPHN0cmluZz47XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2lnbmluZ09wdGlvbnMge1xuICBzZWNyZXQ6IHN0cmluZyB8IFNlY3JldE1pZGRsZXdhcmU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpZ25pbmcge1xuICAvKipcbiAgICogQW4gZXhwcmVzcyBtaWRkbGV3YXJlIGZvciBoYW5kbGluZyBzaWduZWQgcmVxdWVzdHMuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIG1pZGRsZXdhcmUob3B0aW9uczogU2lnbmluZ09wdGlvbnMpIHtcbiAgICBsZXQgc2VjcmV0ID0gb3B0aW9ucy5zZWNyZXQgYXMgU2VjcmV0TWlkZGxld2FyZTtcblxuICAgIC8vIEVuc3VyZSBzZWNyZXQgaXMgYSBwcm9taXNlIHRvIGEgc3RyaW5nXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLnNlY3JldCA9PT0gdHlwZW9mICdzdHJpbmcnKSB7XG4gICAgICBzZWNyZXQgPSBQcm9taXNlLnJlc29sdmUob3B0aW9ucy5zZWNyZXQpIGFzIGFueTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gdGhlIGV4cHJlc3MgaW50ZXJmYWNlIG1pZGRsZXdhcmVcbiAgICByZXR1cm4gYXN5bmMgKHJlcTogQmFzZVJlcXVlc3QsIHJlczogQmFzZVJlc3BvbnNlLCBuZXh0OiAoKSA9PiB2b2lkKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICBjb25zdCB7IHRpbWVzdGFtcCwgc2lnbmF0dXJlIH0gPSBwYXJzZUhlYWRlcnMocmVxKTtcblxuICAgICAgLy8gUmVxdWVzdCB0aW1lc3RhbXAgc2lnbmF0dXJlIGV4cGlyZWRcbiAgICAgIGlmICghdGltZXN0YW1wKSB7XG4gICAgICAgIHRocm93IG5ldyBIdHRwRXJyb3IoXCJJbnZhbGlkIHJlcXVlc3Qgc2lnbmF0dXJlOiB0aW1lc3RhbXAgaW52YWxpZCBvciBleHBpcmVkXCIsIEh0dHBDb2RlLkNsaWVudC5CQURfUkVRVUVTVCk7XG4gICAgICB9XG5cbiAgICAgIC8vIEdlbmVyYXRlIHRoZSBleHBlY3RlZCByZXF1ZXN0IHNpZ25hdHVyZVxuICAgICAgY29uc3QgY29tcHV0ZWRTaWduYXR1cmUgPSBnZW5lcmF0ZVNpZ25hdHVyZVBheWxvYWQocmVxLCBhd2FpdCBzZWNyZXQocmVxLCByZXMpKTtcblxuICAgICAgLy8gVmFsaWRhdGUgdGhlIHJlcXVlc3Qgc2lnbmF0dXJlXG4gICAgICBpZiAoc2lnbmF0dXJlICYmIHNpZ25hdHVyZSA9PT0gY29tcHV0ZWRTaWduYXR1cmUpIHtcbiAgICAgICAgcmV0dXJuIG5leHQoKTtcbiAgICAgIH1cblxuICAgICAgLy8gSW5jb3JyZWN0IHJlcXVlc3Qgc2lnbmF0dXJlXG4gICAgICB0aHJvdyBuZXcgSHR0cEVycm9yKFwiSW52YWxpZCByZXF1ZXN0IHNpZ25hdHVyZTogaW5jb3JyZWN0IGZvcm1hdFwiLCBIdHRwQ29kZS5DbGllbnQuQkFEX1JFUVVFU1QpO1xuICAgIH1cbiAgfVxufVxuIl19