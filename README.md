This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Purpose

In this project, you can learn following tools by simple example:

### `Redux-observable`

Using epics as middleware to deal with dispatching actions.<br>

Examples in src/epics

### `Immutablejs with typescipt`

The most complicated part is how to define all state types in store by typescript.<br>

so this example used Record and Record.Factory to customize state types in reducer to validate them.

Examples in src/reducer/commonReducer.tsx<br>

and also, here's an example to show how to validate component's props types passed from redux immutable state.<br>

Examples in src/container/Home/Home.tsx<br>

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn Redux-observable, check out the [Redux-observable documentation](https://redux-observable.js.org/).

To learn Typescript, check out the [Typescript documentation](https://www.typescriptlang.org/).

To learn Immutable.js, check out the [ImmutableJs documentation](https://facebook.github.io/immutable-js/).
