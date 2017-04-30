

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
		var sequence = {kick: [], snare : [], crash: [], guitar_open : [], guitar_muted : []};

		for (var i = 0; i < barsCount; i++) {
		
			var newBar = this._generateBar(size);
			for( key in newBar ) {
				var instrumentNotes = newBar[key];
				for (var j = 0; j < instrumentNotes.length; j++ ) {
					instrumentNotes[j][0] = instrumentNotes[j][0] + i * barDuration;
				}
				sequence[key] = sequence[key].concat(newBar[key]);
			}

		}
		return sequence;
	}

	this._generateBar = function(size) {
		return null;
	}
}





function RMMEngine() {
	BaseEngine.apply(this);


	
	this._generateBar = function( size ) {

		var resultBar = {};
		var eighthNotesPerBar = 8 * size[0] / size[1];

		resultBar.kick = generateKick( eighthNotesPerBar );
		resultBar.snare = generateSnare ( eighthNotesPerBar );
		resultBar.crash = generateCrash ( eighthNotesPerBar );
		var guitar = generateGuitar( eighthNotesPerBar );
		resultBar.guitar_open = guitar.open;
		resultBar.guitar_muted = guitar.muted;

		return resultBar;
	}


	var eighthNoteDuration = 1 / 8;

	function generateKick( eighthNotesNumber ) {
		
		var result = [];
		
		var parts = SplitNumberIntoRandomParts( eighthNotesNumber ); 	//разделим такт на случайные части	
		var startPosition = 0;
		for (var i = 0; i < parts.length; i++) {
			
			var notesNumber = GetRandomNumberBetween( 0, 3 ); 	//на каждую часть выделим случайное количество ударов
			var notesDuration = parts[i] / notesNumber * eighthNoteDuration;
			
			for ( var j = 0; j < notesNumber; j++ ) {

				result.push( [startPosition, notesDuration] );
				startPosition += notesDuration;

			}

		}
		
		return result;
	}


	function generateSnare( eighthNotesNumber ) {	
		var result = [];

		var startPosition = 0;
		for ( var i = 0; i < eighthNotesNumber; i++ ) {

			if ( GetRandomBoolean() )
				result.push( [ i * eighthNoteDuration, eighthNoteDuration ] );

		}
		return result;
	}


	function generateCrash( eighthNotesNumber ) {
            
		var result = [];
		function addEighthNote( positon ) {
			if ( positon < eighthNotesNumber )
				result.push( [ positon * eighthNoteDuration, eighthNoteDuration ] );
		}

		addEighthNote(0);
		addEighthNote(4);

		if (GetRandomBoolean()) {
			if (GetRandomBoolean()) {
				addEighthNote(2);
				addEighthNote(6);
			} else {
				addEighthNote(3);
				addEighthNote(7);
			}
		}
		return result;
	}


	function generateGuitar(eighthNotesNumber) {
		
		var result = {
			open : [],
			muted : []
		}
		
		for (var i = 0; i < 8; i++) { 
			if (GetRandomBoolean()) {
				if (GetRandomBoolean())
					result.open.push ( [ i * eighthNoteDuration, eighthNoteDuration ] );
				else
					result.muted.push ( [ i * eighthNoteDuration, eighthNoteDuration ] );
			}
		}
		return result;
	}

	
	function SplitNumberIntoRandomParts(number) {
		var sum = [];
		while (number > 0) {
			var part = Math.round( Math.random() * (number - 1) ) + 1;
			sum.push(part);
			number -= part;
		}
		return sum;	
	}

	function GetRandomNumberBetween( min, max ) { return ( Math.floor(Math.random() * max) + min ); }

	function GetRandomBoolean() { return Math.random() < .5; }

}


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



var engine = new RMMEngine();
var adapter = new EngineToGlasgowAdapter();

var sequence = engine.GenerateSequence([4, 4], 1);
var adaptedSequence = adapter.getAdaptedSequence(sequence);

console.log(JSON.stringify(adaptedSequence));