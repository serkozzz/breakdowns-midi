'use strict';


var engine = new (require('./RMMEngine')).RMMEngine();
var adapter = new (require('./EngineToGlasgowAdapter')).EngineToGlasgowAdapter();


function adaptEngineSequenceForGlasgow(sequence) {

}

var sequence = engine.GenerateSequence([4, 4], 2);
adapter.adapt(sequence);

console.log(JSON.stringify(sequence));