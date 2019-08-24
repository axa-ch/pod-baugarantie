# Pod baugarantie v2

[![Build Status](https://travis-ci.org/axa-ch/pod-baugarantie.svg?branch=develop)](https://travis-ci.org/axa-ch/pod-baugarantie)

This POD will start its journey as a standalone application and later on it will be part of the axa-ch webhub architecture.

It is the result of a MAS Master work combined with the HSR School, Luca Mele, Armin Mattle and AXA Baugarantie.

## Webhub Architecture

A POD is nothing else than a simple Frontend Application that can be integrated into AEM (AXA's CMS). Content authors can build webpages on www.axa.ch by drag & drop. Because a POD has business logic inside and people developing it are in completly different teams

## Frontend

This application represents the frontend of the new Baugarantie Portal

## Tasks

- `npm start` to start development mode with the mock api. Used for manual tests as well.
- `npm run api` starts ONLY the mock REST api
- `npm run test` starts all the tests, UI/integration und Unit (works best under UNIX)
- `npm run test-ui` starts only the ui/integration tests and opens a chrome window (works best under UNIX)
- `npm run build` to build the application as a POD and as a standalone application. Build artifact can be found in `/dist` and in `/lib`
- `npm run build-standalone` to build only the standalone application. Build artifact can be found in `/dist`
- `npm run build-pod` to build only as a POD. Build artifact can be found in `/lib`
