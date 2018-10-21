import { Signing } from "../lib";
import * as request from 'supertest';
import Server from 'ts-framework';

describe('lib.Server', () => {
  class TestServer extends Server {
    constructor() {
      super({
        port: process.env.PORT as any || 3333,
        router: {
          routes: {
            get: { '/': (req, res) => res.success({ test: 'ok' }) }
          },
        }
      })
    }

    onMount() {
      this.app.use(Signing.middleware);
      super.onMount();
    }
  }

  it('should set the appropriate version headers', async () => {
    // Initialize a simple server
    const server = new TestServer();

    // Perform a simple request to get a 200 response
    await request(server.app).get('/')
      .expect('Content-Type', /json/)
      .expect('X-API-Version', '1.2.3')
      .expect(200, { test: 'ok' });
  });
});
