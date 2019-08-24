# Pod baugarantie v2

[![Build Status](https://travis-ci.org/axa-ch/pod-baugarantie.svg?branch=develop)](https://travis-ci.org/axa-ch/pod-baugarantie)

This POD will start its journey as a standalone application and later on it will be part of the axa-ch webhub architecture.

It is the result of a MAS Master work combined with the HSR School, Luca Mele, Armin Mattle and AXA Baugarantie.

## Webhub Architecture

A POD is nothing else than a simple Frontend Application that can be integrated into AEM (AXA's CMS). Content authors can build webpages on www.axa.ch by draggin & dropping AEM components. Because a POD containes business logic and people developing it are in completly different teams, the architecture allows PODs to be developed on a completely different Git Repository than the one where the whole website is saved. A POD exports his artefacts to [npm](https://www.npmjs.com/) as a ES Module and is versioned according to [semver](https://semver.org/). During AEM's build, a special built step calls a NodeJs job which transforms the POD into a AEM compatible JavaScript. During runtime, there is a JavaScript framework that connects via interfaces to a POD's services and provide to the POD AEM enviroment data (such as language or on which stage the pod is running). CSS, JSON and Images have to be bundled within one entry point in the ES Module (most of the time: `lib/index.js`) and external libraries have to be referenced, needed for [Webpack's Split Chunk Plugin](https://webpack.js.org/plugins/split-chunks-plugin/). There are [Jenkins](https://jenkins.io/) pipelines that allows a POD to be build independently to other PODs and deployed on AXA.ch's DEV or Acceptance Server. Once a POD has been tested, POD owner can promote that version which creates a Pull Request to AXA.ch's Git Repository freezing that version as the version which will go live with AXA.ch's next Prod Release.

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
