'use strict';

const scribble = require('scribbletune');


// Get alternate notes from the C Phrygian mode
var notes = scribble.mode('c', 'phrygian').filter((x, i) => i % 2 === 0);

// // Generate 4 clips (one for each note) and concat them together
// var clip = notes.reduce((accumulator, note) => {
// 	var partOfClip = scribble.clip({
// 		notes: [note],	
// 		pattern: 'x-x_-xx_'.repeat(4), // Each note will use this pattern
// 		sizzle: true
// 	}); 	
// 	return accumulator.concat(partOfClip);
// }, []);

// // Export a midi file from this clip
// scribble.midi(clip, 'Template Project/generated_midi/3.mid');




let clip = scribble.clip({
    notes: scribble.scale('c', 'major', 3), // this works too ['c3', 'd3', 'e3', 'f3', 'g3', 'a3', 'b3']
	pattern: 'xxxxxxxxxxxxxxxx'
});


//how do chord manualy
 let clip2 = scribble.clip({
    notes: [['c3', 'd3']],
	pattern: 'xxxxxxxxxxxxxxxx'
});

scribble.midi(clip, 'Template Project/generated_midi/1.mid');
scribble.midi(clip2, 'Template Project/generated_midi/2.mid');