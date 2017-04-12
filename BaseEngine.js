

function BaseEngine()
{
	/**
	 * Creates and return sequence. Sequence`s notes are fractional numbers(portion of 4/4bar, it corresponds to the generally accepted duration of notes).
	 * Negative number means pause, positive - note.
	*	@param {Array} size: [4, 4] or [3, 4] etc
	*   @param {int} barsCount: barsCount
 	* 	@returns {Object} : {
	*		kick : [1/4, 1/8, 1/8, 1/4, 1/16, 1/16, 1/8],	
	*		snare : [-3/8, 1/8, 1/8, -3/8 ],
	*		hat : [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125],
	* 		guitart : [....]
	*		guitar_muted : [....]
	* 	}
	*/
	this.GenerateSequence = function(size, barsCount) {
		var bars = (barsCount) ? barsCount : 1;
		var sequence = [];
		for (var i = 0; i < barsCount; i++) {
			sequence = sequence.concat(this._generateBar(size));
		}
		return sequence;
	}

	this._generateBar = function(size) {
		return null;
	}
}


exports.BaseEngine = BaseEngine;