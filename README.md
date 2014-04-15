Mongoose Soft Delete Plugin
============================

Mongoose plugin that enables soft deletion of Models/Documents.  

This plugin is based on the work of [Yi](https://github.com/yi).  

## What's Different  
In the original plugin, models were deleted with a date reference only. This version takes that and uses a Boolean flag to to mark models deleted/restored. Now, whoever deleted the data will be recorded in the DB. Additionally, it removes a lot of overhead from the original code and doesn't use Coffeescript for the original code. Also included is an example express app to see if the plugin works.  

## License  
This plugin is licensed under the MIT license and can ve viewed in the LICENSE file.  

## Installation  
Install using [npm](https://npmjs.org)  
```
npm install mongoose-softdelete
```  

To use the example app  
```
grunt
```  

This will start an express server on port 3000 after successful linting. You can view the example at localhost:3000 in your browser. The console will show a message if the operation is successful and the app will exit.

To start example without linting
```
grunt express:dev:start
```  

To lint only
```
grunt jshint
```  

To run test
```
grunt simplemocha
```

## Usage 
```
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    soft_delete = require('mongoose-softdelete');

var TestSchema = new Schema({
  somefield: { type: String, default: 'Hello World!'}
});

TestSchema.plugin(soft_delete);

var Test = mongoose.model('Test', TestSchema);
var test = new Test();

test.softdelete(function(err, done) {
  console.log(done.deleted);
});

test.restore(function(err, done) {
  console.log(done.deleted);
});  

```  

## Copyright  
Copyright 2014 [Riyadh Al Nur](https://github.com/riyadhalnur).  
Built with love at @NewsCred, Dhaka, Bangladesh.
