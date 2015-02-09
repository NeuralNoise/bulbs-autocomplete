'use strict';
angular.module('BulbsAutocomplete.suggestGroupBy.directive', [])
  .directive('bulbsAutocompleteGroupBySuggest', function () {
    return {
      restrict: 'E',
      templateUrl: 'src/bulbs-autocomplete-suggest-group-by-directive/bulbs-autocomplete-suggest-group-by-directive.html',
      scope: {
        formatter: '&',
        grouper: '&',
        items: '=',
        onSelect: '&'
      },
      link: function (scope) {
        scope.$watch('items', function (newItemsValue) {

          var groupedItems = scope.grouper(newItemsValue);
          scope.formattedItems = _.map(groupedItems, function(itemGroup){
            return {
              name: itemGroup.name,
              items: _.map(itemGroup.items, scope.formatter)
            };
          });
        });
      }
    };
  });
