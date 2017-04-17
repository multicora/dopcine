# dopcine

## Requironments
* MySql
* Node.js

## User config
Create `/server/userConfig.js` file that exports JSON. It will be merged with default config.

Required properties
```javascript
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