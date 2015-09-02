# bulbs-autocomplete

America's finest autocomplete module for AngularJS.

## Setup
The bulbs-autocomplete package includes two different dropdown directives to aid in creating autocomplete input fields.

To access these directives, include bulbs-autocomplete as a bower dependency and add the script to your html:

```html
<script src="bower_components/bulbs-autocomplete/dist/bulbs-autocomplete.js"></script>
```

Ensure also that this module has access to its dependencies, angular and jQuery.

Now include ```BulbsAutcomplete``` as a dependency to your angular app or module:

```javascript
angular.module('MyModule', [
  'BulbsAutocomplete'
]);
```
Which will give you access to the two different suggestion directives for use in your html. Here is the html for a simple implementation:

```html
<div ng-controller="exampleController">
  Search:
  <input
      type="text"
      ng-model="searchTerm"
      ng-change="updateAutocomplete()"
      ng-keydown="handleKeypress($event)">
  <div>Selected in Suggest: {{ selectedSuggest }}</div>
  <div>Selected in Group Suggest: {{ selectedGroupSuggest }}</div>
  <bulbs-autocomplete-suggest
      formatter="suggestFormatter(item)"
      items="autocompleteItems"
      on-select="suggestSelect(selection)">
  </bulbs-autocomplete-suggest>
  <bulbs-autocomplete-suggest-group-by
      items="autocompleteItems"
      formatter="suggestFormatter(item)"
      grouper="itemGrouper"
      on-select="groupSuggestSelect(selection)">
  </bulbs-autocomplete-suggest-group-by>
</div>
```

To complete this example, we need to provide this controller and fill in these scope variables and functions:

```javascript
angular.module('BulbsAutocomplete.example')
  .controller('exampleController', function ($q, $scope, BULBS_AUTOCOMPLETE_EVENT_KEYPRESS) {
    'use strict';

    // method used to retrieve autocomplete items, while a promise is not really
    //  necessary in this implementation, you'll probably be using a promise
    var $getItems = function () {
      var defer = $q.defer();

      if ($scope.searchTerm) {
        defer.resolve([{
          name: 'item1',
          value: 10
        }, {
          name: 'item11',
          value: 20
        }, {
          name: 'item21',
          value: 30
        }, {
          name: 'item31',
          value: 40
        }, {
          name: 'item41',
          value: 50
        }, {
          name: 'item51',
          value: 60
        }, {
          name: 'item61',
          value: 70
        }]);
      } else {
        defer.resolve([]);
      }

      return defer.promise;
    };

    // formatting function for displaying an item to the user in the suggest dropdown,
    //  called on a per-item basis
    $scope.suggestFormatter = function (item) {
      return item.name + ' - ' + item.value;
    };

    // function called when a user makes a selection in the suggest (non-grouped) dropdown
    $scope.suggestSelect = function (item) {
      $scope.selectedSuggest = item;
    };

    // function called when a user makes a selection in the grouped suggest dropdown
    $scope.groupSuggestSelect = function (item) {
      $scope.selectedGroupSuggest = item;
    };

    // function used to group items, called on the entire collection of items passed in
    //  to the suggest-group-by
    $scope.itemGrouper = function (items) {
      return _.groupBy(items, function (item) {
        return item.value > 30 ? 'Less than or equal to thirty' : 'More than thirty';
      });
    };

    // function to call to update the autocomplete suggest directives, call this when
    //  autocomplete suggestions should change
    $scope.updateAutocomplete = function () {
      $getItems().then(function (results) {
        $scope.autocompleteItems = results;
      });
    };

    // callback used to handle keypress events in the input, allows key interaction with
    //  suggest directives
    $scope.handleKeypress = function ($event) {
      $scope.$broadcast(BULBS_AUTOCOMPLETE_EVENT_KEYPRESS, $event);
    };
  });
```
