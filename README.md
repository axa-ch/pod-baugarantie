# Pod baugarantie v2

## Introduction

[![Build Status](https://travis-ci.org/axa-ch/pod-baugarantie.svg?branch=develop)](https://travis-ci.org/axa-ch/pod-baugarantie)

This POD will start it's journey as a **standalone application** and will later on be part of the **axa-ch webhub** architecture.

It is the result of a MAS Master work combined with the HSR School, Luca Mele, Armin Mattle and AXA Baugarantie.

At the end of the Master work, this application will have created 2 artefacts: Standalone and POD

### Standalone application

A "standalone application" is an export of self-contained JavaScript code all in one bundle, which is optimised for IE11, EDGE, Chrome, Firefox and Safari, on mobile and desktop devices. This bundle is also "minified", which means that JavaScript code that is not needed has been removed and variables and function names have been shrunk to a single letter.

The process of "minification" also removes spaces, newlines and brackets where possible. The conversion from development code, which is written according to the ECMA Specification 2019, to older JavaScript code, which is needed for some legacy browser, is called "transpilation".

Transpilation is not the same as "compilation" because it's source code, theoretically, is still readble and is still code that is interpreted from the Browser's engine.

### POD / Webhub Architecture

A POD is nothing else than a simple Frontend Application that can be integrated into AEM (AXA's CMS). Content authors can build webpages on www.axa.ch by dragging & dropping AEM components. Because a POD contains business logic and people developing it are in different teams, the architecture allows PODs to be developed on a different Git Repository than the one where the whole website is saved. A POD exports his artefacts to [npm](https://www.npmjs.com/) as an ES Module and is versioned according to [semver](https://semver.org/).

During AEM's build, a special built step calls a NodeJs job which transforms the POD into a AEM compatible JavaScript. During runtime, there is a JavaScript framework that connects via interfaces to a POD's service and provide to the POD AEM enviroment data (such as language or on which stage the pod is running).

CSS, JSON and Images have to be bundled within one entry point in the ES Module (most of the time: `lib/index.js`) and external libraries have to be referenced, which is essential for [Webpack's Split Chunk Plugin](https://webpack.js.org/plugins/split-chunks-plugin/).

There are [Jenkins](https://jenkins.io/) pipelines that allow a POD to be built independently to other PODs and deployed on AXA.ch's DEV or acceptance Server. Once a POD has been tested, POD owner can promote that version which creates a Pull Request to AXA.ch's Git repository with the effect of freezing that version as the one that will go live with AXA.ch's next Prod Release.

## Design of the Frontend Application

This application represents the frontend of the new Baugarantie Portal.

The core of the architecture is based on Flux (see below) and implemented with the help of **React and Redux**.

**React** is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies. React does not attempt to provide a complete "application framework". It is designed specifically for building user interfaces and therefore does not include many of the tools some developers might consider necessary to build an application. This allows the choice of whichever libraries the developer prefers to accomplish tasks such as performing network access or local data storage.

To support React's concept of unidirectional data flow, the **Flux architecture** represents an alternative to the popular model-view-controller architecture. Flux features actions which are sent through a central dispatcher to a store, and changes to the store are propagated back to the view. When used with React, this propagation is accomplished through component properties.

Flux can be considered a variant of the observer pattern.

We used Redux to implement the Flux architecture.

**Redux** is a small library with a simple, limited API designed to be a predictable container for application state. It operates in a similar fashion to a [reducing function](https://en.wikipedia.org/wiki/Fold_(higher-order_function)), a functional programming concept.

The application is split into different, self contained components (can also be called systems or shortly [SCS](https://en.wikipedia.org/wiki/Self-contained_system_(software))). These components contain everything they need: CSS, HTML, JavaScript, [Redux actions](https://redux.js.org/basics/actions) and [Redux reducers](https://redux.js.org/basics/reducers). *Per 25.08.2019 the CSS has not been put yet into each component. Reason: relatively small size in its early. Now complexity demands refacatoring and will be fixed soon.*

Every component [connects](https://react-redux.js.org/api/connect) to its dedicated store, but can access, and therefore subscribe, to other parts of the store, populated from other components.

A component can only run actions defined directly by himself. In order to trigger changes in other components, it must pass those changes via the store or via react component properties.

Components can include other components giving to the whole system a very high flexibility due to its self-containedness and composability.

Components are divided by complexity. We have Atoms, Molecules, Organisms and Pages in our Application.

Atoms are the basic building blocks of all matter. Each chemical element has distinct properties, and they can’t be broken down further without losing their meaning.

Molecules are groups of two or more atoms held together by chemical bonds. These combinations of atoms take on their own unique properties, and become more tangible and operational than atoms.

Organisms are assemblies of molecules functioning together as a unit. These relatively complex structures can range from single-celled organisms all the way up to incredibly sophisticated organisms like human beings.

Pages are completed sections of the application containg multiple organisms, molecules and atoms. Every route in the application has its own page component.

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
