# ts-module-boilerplate

This boilerplate allows the quick creation of npm modules written in Typescript.

- Typescript 2.x
- creates an ES5 bundle
- creates a TypeScript declaration bundle
- packs it for npm usage
- uses karma for testing
- uses travis and semantic-release for deployment
- uses linting, coverage and git hooks to increase code quality.

Initially you should:

- clone this repository
- change the package name in package.json
- update the README.md
- run `npm run setup` once

Afterwards you can start implementing classes and tests :)


# My Module name

[![Build Status](https://travis-ci.org/crazyfactory/ts-http-client.svg)](https://travis-ci.org/crazyfactory/ts-module-boilerplate)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

My module description

## Requirements

This project requires [nodejs](https://nodejs.org/en/download/) to be installed on your system. 

## Quick setup

For a complete installation use `npm run setup`. This will run the steps defined in *Setup* in sequence.

## Setup

For a step by step setup do the following:

1) Install globally required npm packages
- `npm install -g gulp typings jspm yarn`

2) Install project dependencies
- `yarn` (installs npm dependencies; mostly for development; replaces `npm install`)
- `jspm install` (installs the typescript transpiler for jspm to be used during bundling)
- `typings install` (installs typings for jasmine)

## Building

- `npm run build` to compile all sources.

Compiled sources will be saved into `/build` and `/dist`.

## Testing

Build your sources, then use

- `npm run test` to run all tests using karma.

Test coverage will be `/coverage`.

## Code styles

This project uses tslint to enforce similar code styles across source and test files. Passing tslint validation is a CI requirement. You can run and validate your code style locally.

- `npm run lint` lints all typescript files in the project.

## Build and deploy

This package is automatically build and deployed using TravisCI and semantic-release. You can however test the process locally:

- `npm run build` creates a minified ES5 bundle in the `/dist`-folder.
- `npm run pack` to create the final package.

Note: You'll have to edit package.json to include a version number of your choice. Don't check this in though as the version number is determined by semantic-release.
