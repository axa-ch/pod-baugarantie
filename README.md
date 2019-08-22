# Pod baugarantie v2

[![Build Status](https://travis-ci.org/axa-ch/pod-baugarantie.svg?branch=develop)](https://travis-ci.org/axa-ch/pod-baugarantie)

This POD will start its journey as a standalone application and later on it will be part of the axa-ch webhub architecture.

It is the result of a MAS Master work combined with the HSR School, Luca Mele, Armin Mattle and AXA Baugarantie.

## Frontend

This application represents the frontend of the new Baugarantie Portal

## Tasks

- `npm start` to start development mode with the mock api
- `npm run api` starts ONLY the mock api
- `npm run test` starts all the tests, UI und Unit (works only under UNIX)
- `npm run test-ui` starts only the ui tests and opens a chrome window (works only under UNIX)
- `npm run build` to build the application as a POD and as a standalone application. Build artifact can be found in `/dist` and in `/lib`
- `npm run build-standalone` to build only the standalone application. Build artifact can be found in `/dist`
- `npm run build-pod` to build only as a POD. Build artifact can be found in `/lib`
