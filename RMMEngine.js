

function RMMEngine() {
	require('./BaseEngine').BaseEngine.apply(this);

	this._generateBar = function(size) {
		return {
			kick : [1/4, 1/8, 1/8, 1/4, 1/16, 1/16, 1/8],	
			snare : [-3/8, 1/8, 1/8, -3/8 ],
			hat : [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125],
	 		guitart : [1/4, 1/8, 1/8, 1/4, 1/16, 1/16, 1/8],	
	 	}
	}

}


exports.RMMEngine = RMMEngine;