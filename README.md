# ts-module-boilerplate

[![Greenkeeper badge](https://badges.greenkeeper.io/crazyfactory/ts-module-boilerplate.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/crazyfactory/ts-module-boilerplate.svg)](https://travis-ci.org/crazyfactory/ts-module-boilerplate)
[![GitHub issues](https://img.shields.io/github/issues/crazyfactory/ts-module-boilerplate.svg)](https://github.com/crazyfactory/ts-module-boilerplate/issues)
[![codecov](https://codecov.io/gh/crazyfactory/ts-module-boilerplate/branch/master/graph/badge.svg)](https://codecov.io/gh/crazyfactory/ts-module-boilerplate)
[![devDependencies Status](https://david-dm.org/crazyfactory/ts-module-boilerplate/dev-status.svg)](https://david-dm.org/crazyfactory/ts-module-boilerplate?type=dev)
[![dependencies Status](https://david-dm.org/crazyfactory/ts-module-boilerplate/status.svg)](https://david-dm.org/crazyfactory/ts-module-boilerplate)

This boilerplate allows the quick creation of npm modules written in Typescript.

- Typescript 2.x
- creates an ES5 bundle
- creates a TypeScript declaration bundle
- packs it for npm usage
- uses karma for testing
- uses travis and semantic-release for deployment
- uses linting, coverage and git hooks to increase code quality.
- is configured to support wallaby

## Usage

Initially you should:

- clone this repository
- update `package.json` (name, repository and description)
- create your own `README.md` (from the `README.tpl.md`-file)
- uncomment `after_success` block in `.travis.yml` to activate semantic-release

Afterwards you can start implementing classes and tests :)
