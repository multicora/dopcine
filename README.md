# dopcine

## Requironments
* MySql
* Node.js

## User config
Create `/server/userConfig.js` file that exports JSON. It will be merged with default config.

Required properties
```json
{
  mailGun: {
    apiKey: <apiKey>,
    domain: <domain>
  },
  storage: {
    accountId: <accountId>,
    applicationKey: <applicationKey>,
    bucketId: <bucketId>
  }
}
```

## Documentation
Tool: `https://github.com/glennjones/hapi-swagger`
Documentation is available by path `/documentation`
