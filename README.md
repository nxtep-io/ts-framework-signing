ts-framework-signing
======================


[![Build Status](https://travis-ci.org/devnup/ts-framework-signing.svg?branch=master)](https://travis-ci.org/devnup/ts-framework-signing)  [![Coverage Status](https://coveralls.io/repos/github/devnup/ts-framework-signing/badge.svg?branch=master)](https://coveralls.io/github/devnup/ts-framework-signing?branch=master)

A minimalistic framework for typescript based applications, with async/await and decorators support.

This plugin extends the Server for handling safe signing using Headers.

```bash
# Install using yarn
yarn add git:https://github.com/nxtep-io/ts-framework-signing.git#master

# Install using NPM
npm install --save git:https://github.com/nxtep-io/ts-framework-signing.git#master
```

## Getting Started (TS-Framework)

Add the module as a Server middleware overriding the router registration method.

```typescript
import Server from 'ts-framework';
import { Signing } from 'ts-framework-signing';

class MyServer extends Server {
  constructor() {
    super({
      port: process.env.PORT as any || 3333,
      routes: {
        get: { '/': (req, res) => res.success({ test: 'ok' }) }
      },
    })
  }

  public register() {
    // Initialize the request signing middleware
    this.app.use(Signing.middleware());

    // Continue with the router initialization
    return super.register();
  }
}
```
<br />

## Getting Started (Express)

This module is also compatible with an Express server.

```typescript
const express = require('express');
const { Signing } = require('ts-framework-signing');

const app = express();

app.use(Signing.middleware());

app.listen(3000, () => console.log('Server listening on port: 3000'));
```
<br />

## License

The project is licensed under the [MIT License](./LICENSE.md).