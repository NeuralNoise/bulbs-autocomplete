// Source: src/bulbs-autocomplete-suggest/bulbs-autocomplete-suggest-formatter-service.js
angular.module('BulbsAutocomplete.suggest.formatter.service', [])
  .service('BulbsAutocompleteFormatterService', function () {
    this.buildFormatter = function (formatter) {
      return function (item) {
        var newItem = _.assign({}, item);
        newItem.display = formatter(item);
        return newItem;
      };
    };
  });

// Source: src/bulbs-autocomplete-suggest/bulbs-autocomplete-suggest-group-by/bulbs-autocomplete-suggest-group-by-directive.js
angular.module('BulbsAutocomplete.suggest.groupBy.directive', [
  'BulbsAutocomplete.suggest.formatter.service'
])
  .directive('bulbsAutocompleteSuggestGroupBy', function (BULBS_AUTOCOMPLETE_EVENT_KEYPRESS, BulbsAutocompleteFormatterService) {
    return {
      restrict: 'E',
      templateUrl: 'src/bulbs-autocomplete-suggest/bulbs-autocomplete-suggest-group-by/bulbs-autocomplete-suggest-group-by.html',
      scope: {
        formatter: '=',
        grouper: '=',
        items: '=',
        onSelect: '&'
      },
      link: function (scope) {
        scope.$watch('items', function (newItemsValue) {
          var groupedItems = scope.grouper(newItemsValue);

          scope.formattedGroupedItems = _.chain(groupedItems)
            .mapValues(function (group) {
              return _.map(group, BulbsAutocompleteFormatterService.buildFormatter(scope.formatter, group));
            })
            .pairs()
            .value();
        });

        scope.selectedGroupIndex = -1;
        scope.selectedIndex = -1;
        scope.$on(BULBS_AUTOCOMPLETE_EVENT_KEYPRESS, function (event, keyEvent) {
          if (!_.isEmpty(scope.formattedGroupedItems)) {
            var lastIndexOfGroups = scope.formattedGroupedItems.length - 1;

            var items;
            var lastIndexOfItems;
            switch (keyEvent.keyCode) {
              case 13:
                // enter
                if (scope.selectedGroupIndex !== -1 && scope.selectedIndex !== -1) {
                  items = scope.formattedGroupedItems[scope.selectedGroupIndex][1];
                  scope.onSelect({selection: items[scope.selectedIndex]});
                }
                break;
              case 38:
                // up
                if (scope.selectedGroupIndex === -1) {
                  scope.selectedGroupIndex = lastIndexOfGroups;
                }

                items = scope.formattedGroupedItems[scope.selectedGroupIndex][1];
                lastIndexOfItems = items.length - 1;

                if (scope.selectedGroupIndex === 0 && scope.selectedIndex === 0) {
                  scope.selectedGroupIndex = lastIndexOfGroups;
                  scope.selectedIndex = scope.formattedGroupedItems[scope.selectedGroupIndex][1].length - 1;
                } else if (scope.selectedIndex === 0) {
                  scope.selectedGroupIndex--;
                  scope.selectedIndex = scope.formattedGroupedItems[scope.selectedGroupIndex][1].length - 1;
                } else {
                  scope.selectedIndex = scope.selectedIndex <= 0 ? lastIndexOfItems : scope.selectedIndex - 1;
                }

                break;
              case 40:
                // down
                if (scope.selectedGroupIndex === -1) {
                  scope.selectedGroupIndex = 0;
                }

                items = scope.formattedGroupedItems[scope.selectedGroupIndex][1];
                lastIndexOfItems = items.length - 1;

                if (scope.selectedGroupIndex === lastIndexOfGroups && scope.selectedIndex === lastIndexOfItems) {
                  scope.selectedGroupIndex = 0;
                  scope.selectedIndex = 0;
                } else if (scope.selectedIndex === lastIndexOfItems) {
                  scope.selectedGroupIndex++;
                  scope.selectedIndex = 0;
                } else {
                  scope.selectedIndex = scope.selectedIndex >= lastIndexOfItems ? 0 : scope.selectedIndex + 1;
                }
                break;
            }
          }
        });
      }
    };
  });

// Source: src/bulbs-autocomplete-suggest/bulbs-autocomplete-suggest-group-by/bulbs-autocomplete-suggest-group-by.js
angular.module('BulbsAutocomplete.suggest.groupBy', [
  'BulbsAutocomplete',
  'BulbsAutocomplete.suggest.groupBy.directive'
]);

// Source: src/bulbs-autocomplete-suggest/bulbs-autocomplete-suggest/bulbs-autocomplete-suggest-directive.js
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
                  scope.onSelect({selection: scope.formattedItems[scope.selectedIndex]});
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

// Source: src/bulbs-autocomplete-suggest/bulbs-autocomplete-suggest/bulbs-autocomplete-suggest.js
angular.module('BulbsAutocomplete.suggest', [
  'BulbsAutocomplete',
  'BulbsAutocomplete.suggest.directive'
]);

// Source: src/bulbs-autocomplete/bulbs-autocomplete-factory.js
angular.module('BulbsAutocomplete.factory', [])
  .factory('BulbsAutocomplete', function () {

    var BulbsAutocomplete = function (getItemsFunction) {
      if (_.isFunction(getItemsFunction)) {
        this._getItems = getItemsFunction;
      } else {
        throw 'BulbsAutocomplete Factory: Creation failed, getItemsFunction must be defined';
      }
    };

    BulbsAutocomplete.prototype.$retrieve = function () {
      var self = this;
      return self._getItems()
        .then(function (results) {
          self._items = results;
          return self._items;
        })
        .catch(function (error) {
          return error;
        });
    };

    return BulbsAutocomplete;
  });

// Source: src/bulbs-autocomplete/bulbs-autocomplete.js
angular.module('BulbsAutocomplete', [
  'BulbsAutocomplete.factory'
])
  .constant('BULBS_AUTOCOMPLETE_EVENT_KEYPRESS', 'bulbs-autocomplete-keypress');

// Source: .tmp/bulbs-autocomplete-templates.js
angular.module('BulbsAutocomplete').run(['$templateCache', function($templateCache) {
$templateCache.put('src/bulbs-autocomplete-suggest/bulbs-autocomplete-suggest-group-by/bulbs-autocomplete-suggest-group-by.html',
    "<ul><li ng-repeat=\"group in formattedGroupedItems\"><div class=bulbs-autocomplete-group-key>{{ group[0] }}<div><ul class=bulbs-autocomplete-group-items><li ng-repeat=\"item in group[1]\" ng-click=onSelectWrapper(item) ng-class=\"{active: $parent.$parent.selectedGroupIndex === $parent.$index && $index === $parent.$parent.selectedIndex}\" ng-mouseenter=\"$parent.$parent.selectedGroupIndex = $parent.$index; $parent.$parent.selectedIndex = $index\" ng-mouseleave=\"$parent.$parent.selectedGroupIndex = -1; $parent.$parent.selectedIndex = -1\">{{ item.display }}</li></ul></div></div></li></ul>"
  );


  $templateCache.put('src/bulbs-autocomplete-suggest/bulbs-autocomplete-suggest/bulbs-autocomplete-suggest.html',
    "<ul><li ng-repeat=\"item in formattedItems\" ng-click=onSelectWrapper(item) ng-class=\"{active: $index === $parent.selectedIndex}\" ng-mouseenter=\"$parent.selectedIndex = $index\" ng-mouseleave=\"$parent.selectedIndex = -1\">{{ item.display }}</li></ul>"
  );

}]);
