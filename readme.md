# Handcuffs

[![Build Status](https://travis-ci.org/VladShcherbin/handcuffs.svg?branch=master)](https://travis-ci.org/VladShcherbin/handcuffs)
[![Coverage](https://codecov.io/gh/VladShcherbin/handcuffs/branch/master/graph/badge.svg)](https://codecov.io/gh/VladShcherbin/handcuffs)

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

### Rules

**accepted**

```js
{ rules: 'accepted' }
```

The field under validation must be `'yes'`, `'on'`, `1`, or `true`.

**alpha**

```js
{ name: 'alpha' }
```

The field under validation must be entirely alphabetic characters.

**alphaNum**

```js
{ password: 'alphaNum' }
```

The field under validation must be entirely alpha-numeric characters.

**alphaNumDash**

```js
{ url: 'alphaNumDash' }
```

The field under validation may have alpha-numeric characters, as well as dashes and underscores.

**array**

```js
{ permissions: 'array' }
```

The field under validation must be an array.

**between**

```js
{ guests: 'between:1,3' }
```

The field under validation must have a size between the given *min* and *max* values.

**boolean**

```js
{ isVisible: 'boolean' }
```

The field under validation must be a boolean. Accepted input values are `true` and `false`.

**max**

```js
{ password: 'max:10' }
```

The field under validation must be less than or equal to the given *max* value.

**min**

```js
{ password: 'min:6' }
```

The field under validation must be greater than or equal to the given *min* value.

**numeric**

```js
{ age: 'numeric' }
```

The field under validation must be numeric.

**required**

```js
{ name: 'required' }
```

The field under validation must be present in the input data and not empty.

**string**

```js
{ name: 'string' }
```

The field under validation must be a string.

## License

MIT
