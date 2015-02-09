'use strict';
angular.module('BulbsAutocomplete.suggestGroupBy.directive', ['BulbsAutocomplete.suggest.formatter.service'])
  .directive('bulbsAutocompleteSuggestGroupBy', function (BulbsAutocompleteFormatterService) {
    return {
      restrict: 'E',
      templateUrl: 'src/bulbs-autocomplete-suggest/bulbs-autocomplete-suggest-group-by/bulbs-autocomplete-suggest-group-by.html',
      scope: {
        formatter: '=',
        grouper: '=',
        items: '=',
        onSelect: '='
      },
      link: function (scope) {
        scope.$watch('items', function (newItemsValue) {
          var groupedItems = scope.grouper(newItemsValue);

          scope.formattedGroupedItems = _.mapValues(groupedItems,
            function (group) {
              return _.map(group, BulbsAutocompleteFormatterService.buildFormatter(scope.formatter));
            });
        });
      }
    };
  });
