# shopmate

A minimal e-commerce site

## Architecture

In setting up this application, I wanted to have an architecture that not only works but is simple enough to be maintained by another developer.
But beyond that, I also wanted a setup that makes it easy for me to express myself.
This formed the basis decision of the technologies and tools used in this application as explained below

### Language (Typescript)

This application is written in [Typescript](https://www.typescriptlang.org/) (a superset of javascript). Typescript does not only make coding javascript application fun, it also makes it possible to build with confidence and makes the latest and evolving features of javascript available without effort.

### Framework (React)

[React](https://reactjs.org/) is by far the most popular javascript framework for developing web applications. React makes it painless to create interactive UIs. React is fast, scalable and simple, thus the best choice I can think of for this application.

### State Management (Redux)

[Redux](https://redux.js.org/) is the de facto standard statement library for react. It is therefore, not surprising that I chose it for managing the state of this application. Thanks to the awesome  [starter kit](https://redux-starter-kit.js.org/) by the redux team, state management cannot be better, easier or more elegant.

### Routing (React router)

Just like redux, [react router](https://reacttraining.com/react-router/) is the de facto standard for reacting in react.

### Styling (Styled components)

Writing css/scss is great, but writing css directly in your components is in my opinion one of the best things to happen to web development and no library does it better in the react ecosystem than styled components. With styled components, there is no need to worry about clashes in styling and other issues related to global css

### Optimal React (Hooks)

It is a know fact that react functional components perform better and are easier to manage than class components. This is why the introduction of hooks to react may be one of the best things to happen to the framework. This is why I decided to go purely functional and use react hooks in this application. Every component in this application is just a function.

### Performance Improvement (PWA)

Using a service worker, this application caches its dependencies, this improves performance as assets are only downloaded once and reused subsequently.

## Installation

To run the app locally, setup a local development environment. Ensure that [`Nodejs`](https://nodejs.org/en/download/) and a package manager such as [`yarn`](https://yarnpkg.com/en/docs/install/) or `npm` (comes with node) are installed on your machine.

- clone the app `git clone git@github.com:Veraclins/shopmate.git`
- move into the folder and install dependencies `cd shopmate && yarn`
- run the app in dev mode (with auto-refresh) `yarn dev`
- Or build and run `yarn build && yarn start`
- Visit `http://localhost:3000` to access the app.

## Deployment

The application is hosted on heroku: [click here](https://clinton-shop.herokuapp.com/)
