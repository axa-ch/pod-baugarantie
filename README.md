# Pod baugarantie v2

## Introduction

[![Build Status](https://travis-ci.org/axa-ch/pod-baugarantie.svg?branch=develop)](https://travis-ci.org/axa-ch/pod-baugarantie)

This POD will start it's journey as a **standalone application** and will later on be part of the **axa-ch webhub** architecture.

It is the result of a MAS Master work combined with the HSR School, Luca Mele, Armin Mattle and AXA Baugarantie.

At the end of the Master work, this application will have created 2 artefacts: Standalone and POD

### Standalone application

A "standalone application" is an export of self-contained JavaScript code all in one bundle, which is optimised for IE11, EDGE, Chrome, Firefox and Safari, on mobile and desktop devices. This bundle is also "minified", which means that JavaScript code that is not needed has been removed and variables and function names have been shrunk to a single letter. The process of "minification" also removes spaces, newlines and brackets where possible. The conversion from development code, which is written according to the ECMA Specification 2019, to older JavaScript code, which is needed for some legacy browser, is called "transpilation". 
Transpilation is not the same as "compilation" because it's source code, theoretically, is still readble and is still code that is interpreted from the Browser's engine. 

### POD / Webhub Architecture

A POD is nothing else than a simple Frontend Application that can be integrated into AEM (AXA's CMS). Content authors can build webpages on www.axa.ch by dragging & dropping AEM components. Because a POD contains business logic and people developing it are in different teams, the architecture allows PODs to be developed on a different Git Repository than the one where the whole website is saved. A POD exports his artefacts to [npm](https://www.npmjs.com/) as an ES Module and is versioned according to [semver](https://semver.org/). During AEM's build, a special built step calls a NodeJs job which transforms the POD into a AEM compatible JavaScript. During runtime, there is a JavaScript framework that connects via interfaces to a POD's service and provide to the POD AEM enviroment data (such as language or on which stage the pod is running). 
CSS, JSON and Images have to be bundled within one entry point in the ES Module (most of the time: `lib/index.js`) and external libraries have to be referenced, which is essential for [Webpack's Split Chunk Plugin](https://webpack.js.org/plugins/split-chunks-plugin/). There are [Jenkins](https://jenkins.io/) pipelines that allow a POD to be built independently to other PODs and deployed on AXA.ch's DEV or acceptance Server. Once a POD has been tested, POD owner can promote that version which creates a Pull Request to AXA.ch's Git repository with the effect of freezing that version as the one that will go live with AXA.ch's next Prod Release.

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
