'use strict'

//glasgow github https://github.com/asb2m10/glasgow

function EngineToGlasgowAdapter() {
    
    var midiCodes = {
        "kick" : 24,
        "snare" : 26,
        "crash" : 65,
        "guitar_open" : 12,
        "guitar_muted" : 13,
    }

    this.getAdaptedSequence = function(sequence) {

        var result = [];
        for ( var key in sequence) {
            var midiCode = midiCodes[key] + 12; // apparently glasgow shifts one octave down, + 12 is compensation
            var velocity = 120;

            var instrSequence = sequence[key];
            for (var i = 0; i < instrSequence.length; i ++) {
                result.push([instrSequence[i][0] * 4, midiCode, velocity, instrSequence[i][1]]);
            }
        }
        return result;
    }

}


exports.EngineToGlasgowAdapter = EngineToGlasgowAdapter;
