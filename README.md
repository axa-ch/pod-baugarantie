# Pod baugarantie v2

[![Build Status](https://travis-ci.org/axa-ch/pod-baugarantie.svg?branch=develop)](https://travis-ci.org/axa-ch/pod-baugarantie)

This POD will start its journey as a standalone application and later on it will be part of the axa-ch webhub architecture.

It is the result of a MAS Master work combined with the HSR School, Luca Mele, Armin Mattle and AXA Baugarantie.

## Webhub Architecture

A POD is nothing else than a simple Frontend Application that can be integrated into AEM (AXA's CMS). Content authors can build webpages on www.axa.ch by drag & drop. Because a POD containes business logic and people developing it are in completly different teams the architecture allows PODs to be develop on a completely different Git Repository than the one where the whole website is located. A POD exports his artefacts to [npm](https://www.npmjs.com/) as a ES Module and versioned according to [semver](https://semver.org/). CSS, JSONs and Images have to be bundled as one and external libraries has to be referenced for [Webpack's Split Chunk Plugin](https://webpack.js.org/plugins/split-chunks-plugin/). There are [Jenkins](https://jenkins.io/) pipelines that allow the POD to be build independently to other pods and deployed on AXA.ch DEV or Acceptance Server. Once that the POD has been tested, POD owner can promote that version which will create a Pull Request to AXA.ch Git Repository freezing that version as the final version which will go live with AXA.ch Prod Release.

## Frontend

This application represents the frontend of the new Baugarantie Portal

## Glossary

- AEM: [Adobe experience manager](https://www.adobe.com/ch_de/marketing/experience-manager.html)
- CMS: [Content management system](https://en.wikipedia.org/wiki/Content_management_system)

## Tasks

- `npm start` to start development mode with the mock api. Used for manual tests as well.
- `npm run api` starts ONLY the mock REST api
- `npm run test` starts all the tests, UI/integration und Unit (works best under UNIX)
- `npm run test-ui` starts only the ui/integration tests and opens a chrome window (works best under UNIX)
- `npm run build` to build the application as a POD and as a standalone application. Build artifact can be found in `/dist` and in `/lib`
- `npm run build-standalone` to build only the standalone application. Build artifact can be found in `/dist`
- `npm run build-pod` to build only as a POD. Build artifact can be found in `/lib`
