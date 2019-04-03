# Table of Contents

- [Dependencies](#Packages)
  - [Code base](#code-base)
  - [Used packages](#used-packages)
- [Available Scripts](#available-scripts)

# Dependencies

## Code base

This project was bootstrapped with [Create React App 2](https://github.com/facebook/create-react-app). This way we don't need to maintain the basic dependencies, like Babel, Webpack, Jest etc. `react-scripts` ensures that we always have a working, thoroughly tested and up-to-date configuration.

## Used packages

### > react-scripts ([docs](https://facebook.github.io/create-react-app/))

Provides a working, thoroughly tested and up-to-date configuration of build and testing tools, polyfills and other goodies. Updating this package alone lets you update all of its dependencies, usually without any additional configuration or migrations.

### > react-app-rewired ([docs](https://github.com/timarney/react-app-rewired))

The `react-scripts` package is great for easy configuration, but it doesn't allow you to override the default configs. However, `react-app-rewired` allows to wrap `react-scripts` and inject custom configs for webpack, jest and many other tools, without the need of 'ejecting' from Create React App. The custom config is expected to be at `./config-overrides.js`.

### > react-router-dom ([docs](https://reacttraining.com/react-router/web))

Opinionated routing library for React. Provides different types of routing modes: browser history, hash or in-memory. React Router v4 allows to define routes inline, wherever they are needed, which allows to create blackboxed, self-sufficient modules that are shareable across multiple projects.

Router links should be treated like `if` statements, rendering different components conditionally based on url match.

### > @material-ui ([docs](https://material-ui.com))

React components that implement Google's Material Design. Contains lots of reusable and functional components. Allows full customization in terms of styling and event handlers.

Material UI allows multiple ways of defining styles, e.g. CSS, SASS, Styled Components or JSS.
In this project we use JSS syntax, which is all JavaScript and allows injecting custom theme everywhere.

Material UI components allow to override their style classes by passing `classes` prop. Each component has multiple detailed partial style classes.

### > enzyme ([docs](https://airbnb.io/enzyme/))

Enzyme is a JavaScript Testing utility for React that makes it easier to assert, manipulate, and traverse your React Components' output.

Integrates with Jest via `jest-enzyme` adapter.

### > prettier ([docs](https://prettier.io/))

Opinionated code formatter. Easily integrates with ESLint. Defines own linting ruleset, extensible via `.eslintrc` and `.prettierrc` files.

### > husky ([docs](https://github.com/typicode/husky))

Allows to define hooks for calling scripts on Git events, like commit or push. For example, allows to lint and format code with Prettier before committing code to the repository.

# Available Scripts

In the project directory, you can run:

### > `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### > `npm test`

Launches the test runner in the interactive watch mode.

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### > `npm test:debug`

Launches the test runner in the interactive watch mode and attaches Node debugger.

### > `npm run build`

Builds the app for production to the `build` folder.

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# TODO

- Authorization (login, logout)
