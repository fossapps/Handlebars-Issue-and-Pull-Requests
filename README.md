# Handlebars-Issue-and-Pull-Requests

[![Greenkeeper badge](https://badges.greenkeeper.io/fossapps/Handlebars-Issue-and-Pull-Requests.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.com/fossapps/Handlebars-Issue-and-Pull-Requests.svg)](https://travis-ci.com/fossapps/Handlebars-Issue-and-Pull-Requests)
[![GitHub issues](https://img.shields.io/github/issues/fossapps/Handlebars-Issue-and-Pull-Requests.svg)](https://github.com/fossapps/Handlebars-Issue-and-Pull-Requests/issues)
[![devDependencies Status](https://david-dm.org/fossapps/Handlebars-Issue-and-Pull-Requests/dev-status.svg)](https://david-dm.org/fossapps/Handlebars-Issue-and-Pull-Requests?type=dev)
[![dependencies Status](https://david-dm.org/fossapps/Handlebars-Issue-and-Pull-Requests/status.svg)](https://david-dm.org/fossapps/Handlebars-Issue-and-Pull-Requests)
[![codecov](https://codecov.io/gh/fossapps/Handlebars-Issue-and-Pull-Requests/branch/master/graph/badge.svg)](https://codecov.io/gh/fossapps/Handlebars-Issue-and-Pull-Requests)

Github app to run your issue body and pull request's body through handlebar to generate new bodies

- Typescript 3.x
- Automatically deploys to now.sh
- uses jest for testing
- uses travis and now.sh for deployment
- uses linting and git hooks to increase code quality.
- automatically creates and pushes to docker hub

## Contributing

Initially you should:

- create your test app (or do live and see what happens :) )
- clone this repository
- npm install
- npm start
- create .env file and ensure you import those env (this project doesn't care about .env files)
- npm start
- forward your port so gh can send you events locally
- make changes
- push to your fork
- create pull request
