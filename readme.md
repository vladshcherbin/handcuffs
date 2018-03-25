# Handcuffs

[![Build Status](https://travis-ci.org/vladshcherbin/handcuffs.svg?branch=master)](https://travis-ci.org/vladshcherbin/handcuffs)
[![Coverage](https://codecov.io/gh/vladshcherbin/handcuffs/branch/master/graph/badge.svg)](https://codecov.io/gh/vladshcherbin/handcuffs)

Async validation library for node and browser.

## Installation

Install using npm or yarn:

```bash
npm install handcuffs
# or
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
  name: 'required|string',
  'wife.age': 'required|number',
  pets: 'required|array',
  'pets.*.type': 'required|string'
}


async function start() {
  const validationResult = await validate(data, rules)

  if (!validationResult.valid) {
    console.log(validationResult.errors)
  }
}

start()
```

> **Note**: This library is written using ES6, in order to use it in your project it is advised to transpile it to your environment. The easiest way to do this is by using [Babel](https://babeljs.io) with [@babel/preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env).

### Rules

**accepted**

```js
{ rules: [rules.accepted()] }
```

The field under validation must be `'yes'`, `'on'`, `1`, or `true`.

**alpha**

```js
{ name: [rules.alpha()] }
```

The field under validation must be entirely alphabetic characters.

**alphaNum**

```js
{ password: [rules.alphaNum()] }
```

The field under validation must be entirely alpha-numeric characters.

**alphaNumDash**

```js
{ url: [rules.alphaNumDash()] }
```

The field under validation may have alpha-numeric characters, as well as dashes and underscores.

**array**

```js
{ permissions: [rules.array()] }
```

The field under validation must be an array.

**between**

```js
{ guests: [rules.between(1, 3)] }
```

The field under validation must have a size between the given *min* and *max* values.

**boolean**

```js
{ isVisible: [rules.boolean()] }
```

The field under validation must be a boolean. Accepted input values are `true` and `false`.

**email**

```js
{ email: [rules.email()] }
```

The field under validation must be formatted as an e-mail address.

**max**

```js
{ password: [rules.max(10)] }
```

The field under validation must be less than or equal to the given *max* value.

**min**

```js
{ password: [rules.min(6)] }
```

The field under validation must be greater than or equal to the given *min* value.

**numeric**

```js
{ age: [rules.numeric()] }
```

The field under validation must be numeric.

**required**

```js
{ name: [rules.required()] }
```

The field under validation must be present in the input data and not empty.

**slug**

```js
{ slug: [rules.slug()] }
```

The field under validation may have lowercase alpha-numeric characters and dashes.

**string**

```js
{ name: 'string' }
```

The field under validation must be a string.

## License

MIT
