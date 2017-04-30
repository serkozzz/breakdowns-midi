

var baseEngineModule = require('./BaseEngine');




function RMMEngine() {
	baseEngineModule.BaseEngine.apply(this);


	
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


exports.RMMEngine = RMMEngine;