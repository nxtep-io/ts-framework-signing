import * as crypto from 'crypto';
import * as request from 'supertest';
import Server, { Controller, Get } from 'ts-framework';
import { Logger } from "ts-framework-common";
import { Signing } from "../lib";

describe('lib.Server', () => {
  Logger.initialize();

  @Controller()
  class TestController {
    @Get('/', [Signing.middleware({ secret: async () => false as any })])
    public static async test(req, res) {
      return res.success({ test: 'ok' })
    }
  }

  class TestServer extends Server {
    constructor() {
      super({
        port: process.env.PORT as any || 3333,
        router: {
          controllers: { Test: TestController }
        }
      })
    }
  }

  it('should not accept an invalid secret for signing', async () => {
    const server = new TestServer();

    const now = Date.now();
    const payload = [];
    const signature = crypto
      .createHmac("sha256", 'test')
      .update(payload.join(","))
      .digest("hex");

    // Perform a simple request to get a 200 response
    await request(server.app).get('/')
      .set('X-Request-Signature', signature)
      .set('X-Request-Timestamp', now.toString())
      .expect(500, /invalid secret/ig)
  });
});
