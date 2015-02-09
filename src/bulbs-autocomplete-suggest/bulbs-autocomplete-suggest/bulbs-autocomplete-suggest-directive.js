'use strict';
angular.module('BulbsAutocomplete.suggest.directive', [
  'BulbsAutocomplete.suggest.formatter.service'
])
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

        scope.selectedIndex = -1;
        scope.$on('bulbs-autocomplete-keypress', function (event, keyEvent) {
          if (scope.formattedItems) {
            var lastIndexOfItems = scope.formattedItems.length - 1;
            switch (keyEvent.keyCode) {
              case 13:
                // enter
                if (scope.selectedIndex !== -1) {
                  scope.onSelect(scope.formattedItems[scope.selectedIndex]);
                }
                break;
              case 38:
                // up
                scope.selectedIndex = scope.selectedIndex <= 0 ? lastIndexOfItems : scope.selectedIndex - 1;
                break;
              case 40:
                scope.selectedIndex = scope.selectedIndex >= lastIndexOfItems ? 0 : scope.selectedIndex + 1;
                break;
            }
          }
        });
      }
    };
  });
