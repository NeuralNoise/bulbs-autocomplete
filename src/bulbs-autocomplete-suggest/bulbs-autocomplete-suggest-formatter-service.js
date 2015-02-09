'use strict';

angular.module('BulbsAutocomplete.suggest.formatter.service', [])
  .service('BulbsAutocompleteFormatterService', function () {
    this.buildFormatter = function (formatter) {
      return function (item, group) {
        var newItem = _.assign({}, item);
        newItem.display = formatter(item);
        return newItem;
      };
    };
  });
