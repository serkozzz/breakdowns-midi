'use strict';

const scribble = require('scribbletune');

var engine = new (require('./RMMEngine')).RMMEngine();

var sequence = engine.GenerateSequence([4, 4], 1);
console.log(JSON.stringify(sequence));