'use strict';
angular.module('BulbsAutocomplete.factory', [])
  .factory('BulbsAutocomplete', function ($q) {

    var BulbsAutocomplete = function (getItemsFunction) {
      if (_.isFunction(getItemsFunction)) {
        this._getItems = getItemsFunction;
      } else {
        throw 'BulbsAutocomplete Factory: Creation failed, getItemsFunction must be defined';
      }
    };
    BulbsAutocomplete.prototype.$retrieve = function () {
      var updateDeferred = $q.defer();
      var self = this;
      self._getItems()
        .then(function (results) {
          self._items = results;
          updateDeferred.resolve(self._itemsFormatted);
        })
        .catch(function (error) {
          updateDeferred.reject(error);
        });
      return updateDeferred.promise;
    };

    return BulbsAutocomplete;
  });
