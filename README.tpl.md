# %PACKAGE_NAME%

[![Build Status](https://travis-ci.org/crazyfactory/ts-module-boilerplate.svg)](https://travis-ci.org/crazyfactory/my-module)
[![codecov](https://codecov.io/gh/crazyfactory/ts-module-boilerplate/branch/master/graph/badge.svg)](https://codecov.io/gh/crazyfactory/ts-module-boilerplate)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Additional badges for public repositories

[![GitHub issues](https://img.shields.io/github/issues/crazyfactory/ts-module-boilerplate.svg)]()
[![npm version](https://img.shields.io/npm/v/crazy@crazy-factory/cycle/core.svg)](https://www.npmjs.com/package/%PACKAGE_NAME%)
[![devDependencies Status](https://david-dm.org/crazyfactory/ts-module-boilerplate/dev-status.svg)](https://david-dm.org/crazyfactory/ts-module-boilerplate?type=dev)
[![dependencies Status](https://david-dm.org/crazyfactory/ts-module-boilerplate/status.svg)](https://david-dm.org/crazyfactory/ts-module-boilerplate)

%PACKAGE_DESCRIPTION%

## Requirements

This project requires [nodejs](https://nodejs.org/en/download/) to be installed on your system.

## Setup

Install project dependencies
- `npm install`

## Tests

- `npm run test` will run karma and test your code. Will also create a code coverage report at `/coverage`.
- Optional: Use WallabyJS for continous testing.

## Code styles

This project uses tslint to enforce similar code styles across source and test files. Passing tslint validation is a CI requirement. You can run and validate your code style locally.

- `npm run lint` lints all typescript files in the project.
- `npm run lint-fix` to also fix most common errors automatically.

## Build and deploy

This package is automatically build and deployed using TravisCI and semantic-release. You can however test the process locally:

- `npm run build` compile sources into all desired formats.
- `npm run pack` to create the final package.

Note: You'll have to edit package.json to include a version number of your choice. Don't check this in though as the version number is determined by semantic-release.
