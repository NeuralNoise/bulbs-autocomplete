'use strict';
angular.module('BulbsAutocomplete.suggest.directive', [])
  .directive('bulbsAutocompleteSuggest', function () {
    return {
      restrict: 'E',
      templateUrl: 'src/bulbs-autocomplete-suggest-directive/bulbs-autocomplete-suggest-directive.html',
      scope: {
        formatter: '=',
        items: '=',
        onSelect: '='
      },
      link: function (scope) {
        var applyFormatter = function (item) {
          item.display = scope.formatter(item);
          return item;
        };
        scope.$watch('items', function (newItemsValue) {
          scope.formattedItems = _.map(newItemsValue, applyFormatter);
        });
      }
    };
  });
