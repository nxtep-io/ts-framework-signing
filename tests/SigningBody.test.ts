import { Signing } from "../lib";
import * as crypto from 'crypto';
import * as request from 'supertest';
import Server, { Get, Controller, Post } from 'ts-framework';

describe('lib.Server', () => {
  @Controller()
  class TestController {
    @Post('/', [Signing.middleware({ secret: 'test' })])
    public static async test(req, res) {
      return res.success({ test: req.param('test') })
    }

    @Post('/bypass_body', [Signing.middleware({ secret: 'test', signedBodyMethods: [] })])
    public static async test(req, res) {
      return res.success({ test: req.param('test') })
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

  it('should set the appropriate signature headers', async () => {
    const server = new TestServer();

    const now = Date.now();
    const body = { test: 'ok' };
    const payload = ['POST', '/', now, JSON.stringify(body)];
    const signature = crypto
      .createHmac("sha256", 'test')
      .update(payload.join(","))
      .digest("hex");

    // Perform a simple request to get a 200 response
    await request(server.app).post('/')
      .send(body)
      .set('X-Request-Signature', signature)
      .set('X-Request-Timestamp', now.toString())
      .expect(200, { test: 'ok' });
  });

  it('should set the appropriate signature headers bypassing body', async () => {
    const server = new TestServer();

    const now = Date.now();
    const payload = ['POST', '/bypass_body', now];
    const signature = crypto
      .createHmac("sha256", 'test')
      .update(payload.join(","))
      .digest("hex");

    // Perform a simple request to get a 200 response
    await request(server.app).post('/bypass_body')
      .send({ test: 'ok' })
      .set('X-Request-Signature', signature)
      .set('X-Request-Timestamp', now.toString())
      .expect(200, { test: 'ok' });
  });
});
