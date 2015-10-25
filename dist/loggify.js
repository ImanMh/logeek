'use strict';

var loggify = (function () {
  var config = {
    filter: '_global_',
    delimiter: '@'
  };

  var loggify = function loggify() {
    var args = normalizeArgs.apply(null, arguments);
    if (!isAllowed(args.msg, args.filter)) return;

    if (args.msg instanceof Array) console.log.apply(null, args.msg);else console.log.call(null, args.msg);
  };

  loggify.show = function (filter) {
    config.filter = filter;
  };

  function isAllowed(msg, filter) {
    if (typeof filter === 'undefined') return config.filter === '_global_';else return filter === config.filter || passesFilter(filter, config.filter);
  }

  function passesFilter(input, filter) {
    var pattern = filter.replace('/*', '(\/[^\/].+)*').replace('*/', '([^\/].+\/)*');

    var reg = new RegExp('^' + pattern + '$');
    return reg.test(input);
  }

  function normalizeArgs() {
    if (arguments.length === 1 && typeof arguments[0] === 'string') {
      var msg = trim(arguments[0].split('@')[0]),
          filter = trim(arguments[0].split('@')[1]) || '_global_';
      return { msg: msg, filter: filter };
    }
    return { msg: arguments[0], filter: arguments[1] };
  }

  function trim(str) {
    if (typeof str === 'undefined') return;
    return str.replace(/^(\s|\n)*|(\s|\n)*$/gm, '');
  }

  return loggify;
})();

//NodeJS wrapper
if (typeof exports !== 'undefined') exports.loggify = loggify;
//# sourceMappingURL=loggify.js.map
