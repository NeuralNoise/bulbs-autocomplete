'use strict';
angular.module('BulbsAutocomplete.suggest.directive', [
  'BulbsAutocomplete.suggest.formatter.service'
])
  .directive('bulbsAutocompleteSuggest', function (BULBS_AUTOCOMPLETE_EVENT_KEYPRESS, BulbsAutocompleteFormatterService) {
    return {
      restrict: 'E',
      templateUrl: 'src/bulbs-autocomplete-suggest/bulbs-autocomplete-suggest/bulbs-autocomplete-suggest.html',
      scope: {
        formatter: '=',
        items: '=',
        onSelect: '&'
      },
      link: function (scope) {
        scope.$watch('items', function (newItemsValue) {
          scope.formattedItems = _.map(newItemsValue, BulbsAutocompleteFormatterService.buildFormatter(scope.formatter));
        });

        scope.selectedIndex = -1;
        scope.$on(BULBS_AUTOCOMPLETE_EVENT_KEYPRESS, function (event, keyEvent) {
          if (scope.formattedItems) {
            var lastIndexOfItems = scope.formattedItems.length - 1;
            switch (keyEvent.keyCode) {
              case 13:
                // enter
                if (scope.selectedIndex !== -1) {
                  // evaluate select callback, check if it's a function to execute
                  var selectCallback = scope.onSelect();
                  if (_.isFunction(selectCallback)) {
                    selectCallback(scope.formattedItems[scope.selectedIndex]);
                  }
                }
                break;
              case 38:
                // up
                scope.selectedIndex = scope.selectedIndex <= 0 ? lastIndexOfItems : scope.selectedIndex - 1;
                break;
              case 40:
                //Down
                scope.selectedIndex = scope.selectedIndex >= lastIndexOfItems ? 0 : scope.selectedIndex + 1;
                break;
            }
          }
        });
      }
    };
  });
