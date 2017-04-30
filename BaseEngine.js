

function BaseEngine()
{
	/**
	*   Creates and return sequence. Each note is present as vector2 - [startPoint, duration]
	*   Duration is a fractional number(portion of 4/4bar - it corresponds to the generally accepted duration of notes - for example 1/8 accords eighth note etc).
	*	@param {Array} size: [4, 4] or [3, 4] etc
	*   @param {int} barsCount: barsCount
	* 	@returns {Object} : {
	*		kick : [ [0, 1/4], [1/4, 1/8], [3/8, 1/4], [5/8, 1/16], [11/16, 1/16],  [3/4, 1/8] ],	
	*		snare : [ [3/8, 1/8], [4/8, 1/8] ],
	*		crash : [ [0.125, 0.125], [0.25, 0.125], [0.375, 0.125], [0.5, 0.125], [0.625, 0.125], [0.75, 0.125], [0.875, 0.125] ],
	* 		guitar_open : [....],
	*		guitar_muted : [....]
	* 	}
	*/
	this.GenerateSequence = function(size, barsCount) {
		var bars = (barsCount) ? barsCount : 1;
		var barDuration = size[0] / size[1];
		var sequence = [];

		for (var i = 0; i < barsCount; i++) {
		
			var newBar = this._generateBar(size);
			for( key in newBar ) {
				var instrumentNotes = newBar[key];
				for (var j = 0; j < instrumentNotes.length; j++ ) {
					instrumentNotes[j][0] = instrumentNotes[j][0] + i * barDuration;
				}
			}
			sequence = sequence.concat(newBar);
		
		}
		return sequence;
	}

	this._generateBar = function(size) {
		return null;
	}

	this.MIDI_CODE_KICK = 24;
	this.MIDI_CODE_SNARE = 26;
	this.MIDI_CODE_CRASH = 65;
	this.MIDI_CODE_OPEN_GUITAR = 12;
	this.MIDI_CODE_MUTED_GUITAR = 13;
}


exports.BaseEngine = BaseEngine;