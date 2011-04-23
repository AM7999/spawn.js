var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

var createSyncedEmitter = function() {
  var emitter = new EventEmitter();
  var syncedEmitter = _.create(emitter);
  var globalListeners = [];
  syncedEmitter.onAll = function(listener) {
    globalListeners.push(listener);
  }
  syncedEmitter.emit = function(event) {
    var eventArgs = arguments;
    globalListeners.forEach(function(each) {
      each.apply(null, eventArgs);
    })
    this.constructor.prototype.emit.apply(this, arguments);
  }
  return syncedEmitter;
}

var objectToArray = function(object) {
  var array = [];
  for(var i in object) {
    array.push(object[i]);
  }
  return array;
}

exports.createSyncedEmitter = createSyncedEmitter;
exports.objectToArray = objectToArray;