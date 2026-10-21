# demo-assignment

A React app that loads the signed-in user's GitHub repositories through GitHub's GraphQL API, lists them, and filters them by search text.

**Status:** Working demo. The GitHub query, list rendering and search filter are implemented and one test exists, but the app runs as a demo and has no deployment URL.

## The problem

Browsing your own GitHub repositories means opening the GitHub page and searching there. This app shows the repositories in its own list and lets you filter them by typing, as an assignment-style exercise in GraphQL and React Query.

## What it does

- Requests the viewer's first 100 repositories from `https://api.github.com/graphql` with `graphql-request` (`src/App.js`).
- Shows a loading state until the request completes.
- Filters the list as the user types in a search box, comparing the typed text with each repository.
- Formats repository dates with a small helper in `src/utils/parseDate.js`.
- Wraps the app in a React Query provider and includes one test for the search input (`src/test/App.test.js`).

## How it's built

- Create React App (`react-scripts`) with React and React Query.
- GraphQL requests are sent with `graphql-request` to GitHub's endpoint. The query asks only for the fields the list displays.
- Firebase Hosting is configured to serve the `build` folder (`firebase.json`).
- The UI is split into a `Header` and a `List` component in `src/components`.

## Running it locally

```bash
npm install
npm start           # react-scripts start
npm test            # react-scripts test
npm run build       # react-scripts build into build/
```

The GitHub request needs an access token for the viewer. The token setup is not documented in the repo.

## What's left

- The GitHub request reads its token from `REACT_APP_API_KEY`. Variables with the `REACT_APP_` prefix are built into the browser bundle, so the token is visible to anyone who loads the app. The request should move behind a server. The repo does not document where the variable is set.
- The test checks only the search input and the text it displays. The GitHub request, the list and date formatting have no tests.
- Repositories are fetched only for the first 100 results, with no pagination.
- Firebase is configured, but no deployed URL is documented.
- The original Create React App template README was replaced with this file.
