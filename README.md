[![Build Status](https://travis-ci.org/riyadhalnur/mongoose-softdelete.svg?branch=master)](https://travis-ci.org/riyadhalnur/mongoose-softdelete)

# Mongoose Soft Delete Plugin

Mongoose plugin that enables soft deletion of Models/Documents.

This plugin is based on the work of [Yi](https://github.com/yi).

## What's Different

In the original plugin, models were deleted with a date reference only. This version takes that and uses a Boolean flag to to mark models deleted/restored. Adds `deletedAt` field to record when a document was deleted. Additionally, it removes a lot of overhead from the original code and doesn't use Coffeescript.

Also checkout [Mongoose Delete](https://github.com/dsanel/mongoose-delete) by [Sanel Deljkic](https://github.com/dsanel).

## License

This plugin is licensed under the MIT license and can ve viewed in the LICENSE file.

## Installation

Install using [npm](https://npmjs.org)

```
npm install mongoose-softdelete --save
```

## Tests

IMPORTANT: You need to have MongoDB running to run tests

```
npm test
```

## Usage

**models/test.js**

```js
const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    soft_delete = require('mongoose-softdelete');

const TestSchema = new Schema({
  somefield: { type: String, default: 'Hello World!' },
});

TestSchema.plugin(soft_delete);

mongoose.model('Test', TestSchema);
```

**controllers/test.js**

```js
const Test = mongoose.model('Test');
const test = new Test();

test.softdelete(function (err, newTest) {
  if (err) {
    callback(err);
  }
  callback(null, newTest);
});

test.restore(function (err, newTest) {
  if (err) {
    callback(err);
  }
  callback(null, newTest);
});

// chainable query method
// defaults to true unless specified
Test.find().isDeleted(false).exec();
```

## Typescript

```ts
import { Schema, model } from 'mongoose';
import softdelete, { ISoftDeletedDocument } from 'mongoose-softdelete';

interface ITestDocument extends ISoftDeletedDocument {
    somefield: string;
}

const TestSchema = new Schema({
    somefield: { type: String, default: 'Hello World!' }
});

TestSchema.plugin(softdelete);

const Test = model<ITestDocument>('Test', TestSchema);
const test1 = new Test();

test1.softdelete(function (err, newTest: ITestDocument) {
    // ...
});

// chainable query method
// defaults to true unless specified
(Test.find({}) as unknown as ISoftDeletedDocumentQuery).isDeleted(false)
```

---

Built with love in Dhaka, Bangladesh by [Riyadh Al Nur](https://twitter.com/riyadhalnur)
