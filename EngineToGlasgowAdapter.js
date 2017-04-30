'use strict'



function EngineToGlasgowAdapter() {
    
    var midiCodes = {
        "kick" : 24,
        "snare" : 26,
        "crash" : 65,
        "guitar_open" : 12,
        "guitar_muted" : 13,
    }

    this.adapt = function(sequence) {
        for ( var key in sequence) {
            var midiCode = midiCodes[key];
            var velocity = 120;

            var instrSequence = sequence[key];
            for (var i = 0; i < instrSequence.length; i ++) {
                instrSequence[i] = [instrSequence[i][0] * 4, midiCode, velocity, instrSequence[i][1]];
            }
        }
    }

}


exports.EngineToGlasgowAdapter = EngineToGlasgowAdapter;
