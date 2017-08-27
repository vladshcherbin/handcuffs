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
| alpha | `{ name: 'alpha' }` | The field under validation must be entirely alphabetic characters. |
| alphaDash | `{ slug: 'alphaDash' }` | The field under validation may have alpha-numeric characters, as well as dashes and underscores. |
| alphaNum | `{ password: 'alphaNum' }` | The field under validation must be entirely alpha-numeric characters. |
| array | `{ permissions: 'array' }` | The field under validation must be an array. |
| between | `{ guests: 'between:1,3' }` | The field under validation must have a size between the given *min* and *max* values. |
| boolean | `{ isVisible: 'boolean' }` | The field under validation must be a boolean value `true` or `false`. |
| max | `{ password: 'max:10' }` | The field under validation must be less than or equal to the given *max* value. |
| min | `{ password: 'min:6' }` | The field under validation must have the given *min* value. |
| numeric | `{ age: 'numeric' }` | The field under validation must be numeric. |
| required | `{ name: 'required' }` | The field under validation must be present and not empty. |
| string | `{ name: 'string' }` | The field under validation must be a string. |