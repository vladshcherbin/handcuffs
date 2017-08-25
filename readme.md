# Handcuffs

[![Build Status](https://travis-ci.org/handcuffs/handcuffs.svg?branch=master)](https://travis-ci.org/handcuffs/handcuffs)
[![Test Coverage](https://img.shields.io/codecov/c/github/handcuffs/handcuffs/master.svg)](https://codecov.io/gh/handcuffs/handcuffs)

Validation library

## Installation

Install using npm or yarn:

```terminal
npm install handcuffs
```

```terminal
yarn add handcuffs
```

## Usage

Basic usage example:

```js
import { validate } from 'handcuffs'

const data = {
  name: 'Jack',
  wife: {
    name: 'Susan'
  }
}

const rules = {
  name: 'required',
  'wife.name': 'required',
  pets: 'required|array'
}

const validationErrors = validate(data, rules)
```

### Available Rules

| Rule | Example | Description |
| --- | --- | --- |
| accepted | `{ rules: 'accepted' }` | The field under validation must be `'yes'`, `'on'`, `1`, or `true`. |
| array | `{ permissions: 'array' }` | The field under validation must be an array. |
| boolean | `{ isVisible: 'boolean' }` | The field under validation must be a boolean value `true` or `false`. |
| required | `{ name: 'required' }` | The field under validation must be present and not empty. |