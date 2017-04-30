'use strict';


var engine = new (require('./RMMEngine')).RMMEngine();
var adapter = new (require('./EngineToGlasgowAdapter')).EngineToGlasgowAdapter();

var sequence = engine.GenerateSequence([4, 4], 2);
var adaptedSequence = adapter.getAdaptedSequence(sequence);

console.log(JSON.stringify(sequence));