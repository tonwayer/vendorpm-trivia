# Welcome to the VendorPM FE Technical Assessment

## Prerequisites

- Read the **README** fully.
- This application is built using [React](https://reactjs.org/), [Vite](https://vitejs.dev/) and [Typescript](https://www.typescriptlang.org/).
- To open the application run the following:

```bash
yarn
yarn dev
```

## API Mocking

- The application uses [MSW](https://mswjs.io/) to mock api calls.
- The api mocking is handled in `src/api-mocks`.
- You may **alter the api** mocking in any way you see fit.
- You may make any **assumptions** on what the api expects and returns.
- If you are not familiar with [MSW](https://mswjs.io/) than you can replace it with another solution.

## The Main Objectives

The name of the game here is TDD _(Test Driven Development)_. If you are not familiar with this concept that does not matter, all you need to be able to do is read JS (TS).

There are two spec files located in:

- src/app/app.spec.tsx
- src/app/modules/people/people.spec.tsx

There are two **main** objectives of the technical assessment:

1. Ensure that as many tests as possible are passing in the spec files.
2. Refactor the people module in order to meet all of the criteria in the [code section of the evaluation](#evaluation).

You do not need to get all tests passing but applicants that complete all tests will be ranked more favorably.

**_You are not allowed to alter the tests files in any way unless specified._**

There are two commands that allow you to run the tests:

```bash
yarn test
yarn test:coverage
```

`yarn test` - Opens Vitest ui in watch mode

`yarn test:coverage` - Generates a coverage report

The test are written using a combination of [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) and [vitest](https://vitest.dev/), unless you wish to write your own tests for some bonus tasks **(_see below_)**, this should not concern you.

You can also add the [Vitest VSCode Extension](https://marketplace.visualstudio.com/items?itemName=ZixuanChen.vitest-explorer) to run tests individually.

## Bonus Tasks

- Update the Github Actions to run Formatting and Linting Checks.
- Add a "Create Person" feature to the application.
  - You have full autonomy and ownership on the requirements of this feature.
  - If attempting this please write unit and integration tests.
- Add your own styling to the features.

## Rules

- You can make any changes do the codebase that you feel necessary to complete the main objective of the technical assessment. **(_Except the test files unless specified_).**
- You may not use a ui library/ framework **(_ANTD, MaterialUI etc_).**
- You can use any other library that you want just be prepared to justify your choices.

## Considerations / Recommendations

- Treat this like you are building a feature for a pre existing enterprise application.
- This is your opportunity to show what you can bring to our engineering team as a FE developer.
- Write clean, reusable and performant code.
- The mocked api only returns 100 results, you should assume that this number is in the thousands. How would this influence your approach to the task?

## Evaluation

_The assessment will be evaluated based on the following:_

- Passing Tests
- Code
  - Quality
  - Structure
  - Consistency
  - Readability
  - Reusability
  - Performance
- Bonus Tasks
