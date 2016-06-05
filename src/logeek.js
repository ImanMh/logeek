// var logeek = (function () {
//   var config = {
//     filter: '_global_',
//     delimiter: '@'
//   };  
// 
//   var logeek = function () {
//     var args = normalizeArgs.apply(null, arguments);
//     if (!isAllowed(args.msg, args.filter))
//       return;
//       
//     if (args.msg instanceof Array)
//       console.log.apply(null, args.msg);
//     else
//       console.log.call(null, args.msg);
//   };
// 
//   logeek.show = function (filter) {
//     config.filter = filter;
//   };
// 
//   function isAllowed (msg, filter) {
//     if (typeof filter === 'undefined')
//       return config.filter === '_global_';
//     else
//       return filter === config.filter || passesFilter(filter, config.filter);
//   }
// 
//   function passesFilter (input, filter) {
//     var pattern = filter.
//         replace('/*', '(\/[^\/].+)*').
//         replace('*/', '([^\/].+\/)*');
//     
//     var reg = new RegExp('^' + pattern + '$');
//     return reg.test(input);
//   }
// 
//   function normalizeArgs () {
//     if (arguments.length === 1 && typeof(arguments[0]) === 'string') {
//       var msg = trim(arguments[0].split('@')[0]),
//           filter = trim(arguments[0].split('@')[1]) || '_global_';
//       return {msg: msg, filter: filter};
//     }
//     return {msg: arguments[0], filter: arguments[1]};
//   }
// 
//   function trim (str) {
//     if (typeof str === 'undefined')
//       return;
//     return str.replace(/^(\s|\n)*|(\s|\n)*$/gm, '');
//   }
//   
//   return logeek;
// })();
// 
// 
// //NodeJS wrapper
// if (typeof exports !== 'undefined')
//   exports.logeek = logeek;
(function () {
  var config = {
    globalName: 'logeek',
    scope: '_global_'
  };
  
  var logeek = function (msg) {
    this.msg = msg;
    return this;
  };
  
  logeek.prototype.at = function (scope) {
    if (config.scope === scope || config.scope === '_global_')
      console.log(this.msg);
  };
  
  var show = function (scope) {
    config.scope = scope;
  };
  
  var logeekParser = function (logCommand) {
    var lastDelimiterIndex = logCommand.lastIndexOf('@'),
        msg = logCommand.substring(0, lastDelimiterIndex),
        scope = logCommand.substring(lastDelimiterIndex + 1);
    
    new logeek(msg).at(scope);
  };
  
  var logeekGen = function (msg) {
    if (msg.indexOf('@') !== -1) {
      logeekParser(msg);
      return;
    }
    return new logeek(msg);
  };

  //browser export
  if (typeof window !== 'undefined') {
    window[config.globalName] = logeekGen;
    window[config.globalName].show = show;
  }
    
  //NodeJS export
  if (typeof exports !== 'undefined'){
    module.exports = logeekGen;
    module.exports.show = show;
  }
})();
