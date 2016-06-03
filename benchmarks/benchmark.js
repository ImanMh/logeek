'use strict';
var logeek = require('../dist/logeek').logeek;

suite('Logeek', function () {
	set('iterations', 100000);

  logeek.show('nothing');

  bench('simple log', function () {
		logeek('Hi');
	});

  bench('array input log', function () {
    logeek(['one', 'tow', 'three']);
	});

  bench('scope defined log', function () {
    logeek('Hi @ S');
	});

  bench('nested scope log', function () {
    logeek('Hi @ S/M/G');
	});

  logeek.show('*/M/F');
  bench('reverse scope half matched', function () {
    logeek('Hi @ S/M/G');
	});
  logeek.show('nothing');


});
