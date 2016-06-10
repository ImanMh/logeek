'use strict';
var logeek = require('../dist/logeek');

suite('Logeek', function () {
	set('iterations', 100000);

  logeek.show('X');

	bench('simple not matching log', function () {
		logeek('Hi').at('s');
	});

	bench('simple matching log', function () {
		logeek('Hi').at('s');
	});

	bench('simple compact log', function () {
		logeek('Hi @ s');
	});

  bench('array input log', function () {
    logeek(['one', 'tow', 'three']).at('s');
	});

  bench('nested scope log', function () {
    logeek('Hi @ S/M/G');
	});

  logeek.show('*/M/F');
  bench('reverse scope half matched', function () {
    logeek('Hi @ S/M/G');
	});


});
