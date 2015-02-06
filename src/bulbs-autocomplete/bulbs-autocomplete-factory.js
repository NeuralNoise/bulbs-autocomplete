'use strict';
angular.module('BulbsAutocomplete.factory', [])
  .factory('BulbsAutocomplete', function($q) {

    var BulbsAutocomplete = function(getItemsFunction, formatFunction) {
      if (_.isFunction(getItemsFunction)) {
        this._getItems = getItemsFunction;
      } else {
        throw 'BulbsAutocomplete Factory: Creation failed, getItemsFunction must be defined';
      }

      if (_.isFunction(formatFunction)) {
        this._formatFunction = formatFunction;
      } else {
        throw 'BulbsAutocomplete Factory: Creation failed, formatFunction must be defined';
      }
    };
    BulbsAutocomplete.prototype.$retrieve = function() {
      var updateDeferred = $q.defer();
      this._getItems()
      .then(function(results) {
        this._items = results;
        this._itemsFormatted = this._formatFunction(results);
        updateDeferred.resolve(this._itemsFormatted);
      })
      .catch(function(error) {
        updateDeferred.reject(error);
      });
      return updateDeferred.promise;
    };
  });
