# dopcine

[ ![Codeship Status for multicora/dopcine](https://app.codeship.com/projects/171a1cc0-3500-0135-8a2f-6aba2a7fe52d/status?branch=master)](https://app.codeship.com/projects/227004)

## Requironments
* MySql
* Node.js

## User config
Create `/server/userConfig.js` file that exports JSON. It will be merged with default config.

Required properties
```javascript
module.exports = {
  mailGun: {
    apiKey: <apiKey>,
    domain: <domain>
  },
  storage: {
    accountId: <accountId>,
    applicationKey: <applicationKey>,
    bucketId: <bucketId>
  }
  db: {
    user: <user name>,
    password: <password>
  },
  server: {
    port: <port>
  },
  mail: {
    defaultFrom: <email address>
  }
};
```

## Run backend
```
cd server
node index.js
```

## Documentation
Tool: `https://github.com/glennjones/hapi-swagger`
Documentation is available by path `/documentation`
