# dopcine

Build status of the branch `develop`: [ ![Codeship Status for multicora/dopcine](https://app.codeship.com/projects/171a1cc0-3500-0135-8a2f-6aba2a7fe52d/status?branch=develop)](https://app.codeship.com/projects/227004)

## Requirements
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

Test commit

## Frontend

Create .env file in "client" folder to specify dev server PORT

```
PORT=3000
```
Edit package.json to specify proxy url, e.g:

```
"proxy": "http://localhost:3001"
```

# Run frontend

```
cd client
WINDOWS:    cmd.exe /C "set NODE_PATH=src/ && npm run start"
Unix:       NODE_PATH=src/ npm run start
```

# Testing:

```
cd client
WINDOWS:    cmd.exe /C "set NODE_PATH=src/ && npm test"
Unix:       NODE_PATH=src/ npm test
```

# Build
```
WINDOWS:    cmd.exe /C "set NODE_PATH=src/ && npm run build"
Unix:       NODE_PATH=src/ npm run build
```

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

