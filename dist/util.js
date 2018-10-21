"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
// TODO: Get from config
exports.MAX_TIMESTAMP_TIMEOUT = 60000; // 1min
/**
 * Parse request headers for checking its signature.
 *
 * @param req The base request
 */
exports.parseHeaders = (req) => {
    const timestamp = req.headers["x-request-timestamp"];
    const signature = req.headers["x-request-signature"];
    const parsedTimestamp = timestamp ? parseInt(timestamp, 10) : undefined;
    // Incorrect request timestamp signature
    if (!timestamp || isNaN(parsedTimestamp)) {
        return { signature };
    }
    // Check if timestamp has already expired
    const hasExpired = parsedTimestamp < Date.now() - exports.MAX_TIMESTAMP_TIMEOUT;
    return {
        signature,
        timestamp: !hasExpired ? parsedTimestamp : undefined
    };
};
/**
 * Generate a HMAC SHA256 signature from request payload and secret string.
 *
 * @param req The base request
 * @param secret The secret to be used in the encryption
 */
exports.generateSignaturePayload = (req, secret) => {
    const items = [req.method, req.url, req.headers["x-request-timestamp"]];
    if (req.method.toLowerCase() === "post" || req.method.toLowerCase() === "put") {
        // Add request body to signature
        items.push(JSON.stringify(req.body));
    }
    if (!secret) {
        throw new Error("Invalid computed signature secret");
    }
    return crypto
        .createHmac("sha256", secret)
        .update(items.join(","))
        .digest("hex");
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQWlDO0FBR2pDLHdCQUF3QjtBQUNYLFFBQUEscUJBQXFCLEdBQUcsS0FBSyxDQUFDLENBQUMsT0FBTztBQUVuRDs7OztHQUlHO0FBQ1UsUUFBQSxZQUFZLEdBQUcsQ0FBQyxHQUFnQixFQUE2QyxFQUFFO0lBQzFGLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQVcsQ0FBQztJQUMvRCxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFXLENBQUM7SUFDL0QsTUFBTSxlQUFlLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBbUIsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBRWxGLHdDQUF3QztJQUN4QyxJQUFJLENBQUMsU0FBUyxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsRUFBRTtRQUN4QyxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUM7S0FDdEI7SUFFRCx5Q0FBeUM7SUFDekMsTUFBTSxVQUFVLEdBQUcsZUFBZSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyw2QkFBcUIsQ0FBQztJQUV4RSxPQUFPO1FBQ0wsU0FBUztRQUNULFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxTQUFTO0tBQ3JELENBQUM7QUFDSixDQUFDLENBQUM7QUFFRjs7Ozs7R0FLRztBQUNVLFFBQUEsd0JBQXdCLEdBQUcsQ0FBQyxHQUFnQixFQUFFLE1BQWMsRUFBRSxFQUFFO0lBQzNFLE1BQU0sS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO0lBRXhFLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsS0FBSyxNQUFNLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsS0FBSyxLQUFLLEVBQUU7UUFDN0UsZ0NBQWdDO1FBQ2hDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUN0QztJQUVELElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDWCxNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7S0FDdEQ7SUFFRCxPQUFPLE1BQU07U0FDVixVQUFVLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQztTQUM1QixNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN2QixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbkIsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY3J5cHRvIGZyb20gXCJjcnlwdG9cIjtcbmltcG9ydCB7IEJhc2VSZXF1ZXN0IH0gZnJvbSBcInRzLWZyYW1ld29ya1wiO1xuXG4vLyBUT0RPOiBHZXQgZnJvbSBjb25maWdcbmV4cG9ydCBjb25zdCBNQVhfVElNRVNUQU1QX1RJTUVPVVQgPSA2MDAwMDsgLy8gMW1pblxuXG4vKipcbiAqIFBhcnNlIHJlcXVlc3QgaGVhZGVycyBmb3IgY2hlY2tpbmcgaXRzIHNpZ25hdHVyZS5cbiAqXG4gKiBAcGFyYW0gcmVxIFRoZSBiYXNlIHJlcXVlc3RcbiAqL1xuZXhwb3J0IGNvbnN0IHBhcnNlSGVhZGVycyA9IChyZXE6IEJhc2VSZXF1ZXN0KTogeyB0aW1lc3RhbXA/OiBudW1iZXI7IHNpZ25hdHVyZTogc3RyaW5nIH0gPT4ge1xuICBjb25zdCB0aW1lc3RhbXAgPSByZXEuaGVhZGVyc1tcIngtcmVxdWVzdC10aW1lc3RhbXBcIl0gYXMgc3RyaW5nO1xuICBjb25zdCBzaWduYXR1cmUgPSByZXEuaGVhZGVyc1tcIngtcmVxdWVzdC1zaWduYXR1cmVcIl0gYXMgc3RyaW5nO1xuICBjb25zdCBwYXJzZWRUaW1lc3RhbXAgPSB0aW1lc3RhbXAgPyBwYXJzZUludCh0aW1lc3RhbXAgYXMgc3RyaW5nLCAxMCkgOiB1bmRlZmluZWQ7XG5cbiAgLy8gSW5jb3JyZWN0IHJlcXVlc3QgdGltZXN0YW1wIHNpZ25hdHVyZVxuICBpZiAoIXRpbWVzdGFtcCB8fCBpc05hTihwYXJzZWRUaW1lc3RhbXApKSB7XG4gICAgcmV0dXJuIHsgc2lnbmF0dXJlIH07XG4gIH1cblxuICAvLyBDaGVjayBpZiB0aW1lc3RhbXAgaGFzIGFscmVhZHkgZXhwaXJlZFxuICBjb25zdCBoYXNFeHBpcmVkID0gcGFyc2VkVGltZXN0YW1wIDwgRGF0ZS5ub3coKSAtIE1BWF9USU1FU1RBTVBfVElNRU9VVDtcblxuICByZXR1cm4ge1xuICAgIHNpZ25hdHVyZSxcbiAgICB0aW1lc3RhbXA6ICFoYXNFeHBpcmVkID8gcGFyc2VkVGltZXN0YW1wIDogdW5kZWZpbmVkXG4gIH07XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgSE1BQyBTSEEyNTYgc2lnbmF0dXJlIGZyb20gcmVxdWVzdCBwYXlsb2FkIGFuZCBzZWNyZXQgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSByZXEgVGhlIGJhc2UgcmVxdWVzdFxuICogQHBhcmFtIHNlY3JldCBUaGUgc2VjcmV0IHRvIGJlIHVzZWQgaW4gdGhlIGVuY3J5cHRpb25cbiAqL1xuZXhwb3J0IGNvbnN0IGdlbmVyYXRlU2lnbmF0dXJlUGF5bG9hZCA9IChyZXE6IEJhc2VSZXF1ZXN0LCBzZWNyZXQ6IHN0cmluZykgPT4ge1xuICBjb25zdCBpdGVtcyA9IFtyZXEubWV0aG9kLCByZXEudXJsLCByZXEuaGVhZGVyc1tcIngtcmVxdWVzdC10aW1lc3RhbXBcIl1dO1xuXG4gIGlmIChyZXEubWV0aG9kLnRvTG93ZXJDYXNlKCkgPT09IFwicG9zdFwiIHx8IHJlcS5tZXRob2QudG9Mb3dlckNhc2UoKSA9PT0gXCJwdXRcIikge1xuICAgIC8vIEFkZCByZXF1ZXN0IGJvZHkgdG8gc2lnbmF0dXJlXG4gICAgaXRlbXMucHVzaChKU09OLnN0cmluZ2lmeShyZXEuYm9keSkpO1xuICB9XG5cbiAgaWYgKCFzZWNyZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGNvbXB1dGVkIHNpZ25hdHVyZSBzZWNyZXRcIik7XG4gIH1cblxuICByZXR1cm4gY3J5cHRvXG4gICAgLmNyZWF0ZUhtYWMoXCJzaGEyNTZcIiwgc2VjcmV0KVxuICAgIC51cGRhdGUoaXRlbXMuam9pbihcIixcIikpXG4gICAgLmRpZ2VzdChcImhleFwiKTtcbn07XG4iXX0=