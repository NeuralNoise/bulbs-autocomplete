'use strict';
angular.module('BulbsAutocomplete.suggest.directive', ['BulbsAutocomplete.suggest.formatter.service'])
  .directive('bulbsAutocompleteSuggest', function (BulbsAutocompleteFormatterService) {
    return {
      restrict: 'E',
      templateUrl: 'src/bulbs-autocomplete-suggest/bulbs-autocomplete-suggest/bulbs-autocomplete-suggest.html',
      scope: {
        formatter: '=',
        items: '=',
        onSelect: '='
      },
      link: function (scope) {
        scope.$watch('items', function (newItemsValue) {
          scope.formattedItems = _.map(newItemsValue, BulbsAutocompleteFormatterService.buildFormatter(scope.formatter));
        });
      }
    };
  });
