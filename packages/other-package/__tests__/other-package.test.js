'use strict';

const otherPackage = require('..');
const assert = require('assert').strict;

assert.strictEqual(otherPackage(), 'Hello from otherPackage');
console.info('otherPackage tests passed');
