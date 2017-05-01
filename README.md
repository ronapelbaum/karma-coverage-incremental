karma-coverage-incremental
===
[![npm version](https://badge.fury.io/js/eslint-plugin-arguments.svg)](https://badge.fury.io/js/eslint-plugin-arguments)
[![Build Status](https://travis-ci.org/ronapelbaum/karma-coverage-incremental.svg?branch=master)](https://travis-ci.org/ronapelbaum/karma-coverage-incremental)
[![Coverage Status](https://coveralls.io/repos/github/ronapelbaum/karma-coverage-incremental/badge.svg?branch=master)](https://coveralls.io/github/ronapelbaum/karma-coverage-incremental?branch=master)

A karma-coverage plugin for incremental coverage

# Usage

```
npm install --save-dev karma-coverage-incremental
```

## Karma (JSON support)

#### install `karma-coverage`

```
npm i -D karma-coverage
```

#### config `karma-coverage`

- Outsource threshold in a separate json file 
- Use `json-summary` coverage-reporter

```javascript
coverageReporter: {
  check: {
    global: require('./coverage.conf.json') 
  }
  reporters: [
           {type: 'json-summary'}
        ]
}
```

#### add `increment`

Add `increment` to reporters:

```javascript
    reporters: ['coverage', 'increment']
```

#### config `increment`

```javascript
incrementConfig: {
  flexibility: 0.5, //factor to reduce the roughness of the latest coverage results
  coverageCheckPath: './coverage.conf.json' //path to coverage threshold json
}
```

## Node
(in progress...)

## Istanbul (YAML support)
(in progress...)

# Development

```
npm install

npm test

npm run lint
npm run lint-fix
```
