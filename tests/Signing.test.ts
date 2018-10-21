import { Signing } from "../lib";
import * as crypto from 'crypto';
import * as request from 'supertest';
import Server, { Get, Controller } from 'ts-framework';

describe('lib.Server', () => {
  @Controller()
  class TestController {
    @Get('/', [Signing.middleware({ secret: 'test' })])
    public static async test(req, res) {
      return res.success({ test: 'ok' })
    }

    @Get('/longer_expiration', [Signing.middleware({ secret: 'test', maxTimeout: 120000 })])
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

  it('should set the appropriate signature headers', async () => {
    const server = new TestServer();

    const now = Date.now();
    const payload = ['GET', '/', now];
    const signature = crypto
      .createHmac("sha256", 'test')
      .update(payload.join(","))
      .digest("hex");

    // Perform a simple request to get a 200 response
    await request(server.app).get('/')
      .set('X-Request-Signature', signature)
      .set('X-Request-Timestamp', now.toString())
      .expect(200, { test: 'ok' });
  });

  it('should set the appropriate signature headers with longer expiration', async () => {
    const server = new TestServer();

    const now = Date.now() - 100000;
    const payload = ['GET', '/longer_expiration', now];
    const signature = crypto
      .createHmac("sha256", 'test')
      .update(payload.join(","))
      .digest("hex");

    // Perform a simple request to get a 200 response
    await request(server.app).get('/longer_expiration')
      .set('X-Request-Signature', signature)
      .set('X-Request-Timestamp', now.toString())
      .expect(200, { test: 'ok' });
  });

  it('should not accept an invalid signature', async () => {
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
      .expect(400, /incorrect format/ig)
  });

  it('should not accept a request without signature', async () => {
    const server = new TestServer();

    const now = Date.now();
    const payload = ['GET', '/', now];

    await request(server.app)
      .get('/')
      .set('X-Request-Timestamp', now.toString())
      .expect(400, /incorrect format/ig)
  });

  it('should not accept a request without timestamp', async () => {
    const server = new TestServer();

    const now = Date.now();
    const payload = ['GET', '/', now];
    const signature = crypto
      .createHmac("sha256", 'test')
      .update(payload.join(","))
      .digest("hex");

    await request(server.app)
      .get('/')
      .set('X-Request-Signature', signature)
      .expect(400, /timestamp invalid or expired/ig)
  });

  it('should not accept a request with an expired timestamp', async () => {
    const server = new TestServer();

    const now = Date.now() - 120000;
    const payload = ['GET', '/', now];
    const signature = crypto
      .createHmac("sha256", 'test')
      .update(payload.join(","))
      .digest("hex");

    await request(server.app)
      .get('/')
      .set('X-Request-Signature', signature)
      .set('X-Request-Timestamp', now.toString())
      .expect(400, /timestamp invalid or expired/ig)
  });
});
