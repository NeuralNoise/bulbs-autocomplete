angular.module('BulbsAutocomplete').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/bulbs-autocomplete-suggest/bulbs-autocomplete-suggest-group-by/bulbs-autocomplete-suggest-group-by.html',
    "<ul>\n" +
    "  <li ng-repeat=\"group in formattedGroupedItems\">\n" +
    "    <div class=\"bulbs-autocomplete-group-key\">{{ group[0] }}<div>\n" +
    "    <ul class=\"bulbs-autocomplete-group-items\">\n" +
    "      <li\n" +
    "          ng-repeat=\"item in group[1]\"\n" +
    "          ng-click=\"onSelect(item)\"\n" +
    "          ng-class=\"{active: $parent.$parent.selectedGroupIndex === $parent.$index && $index === $parent.$parent.selectedIndex}\"\n" +
    "          ng-mouseenter=\"$parent.$parent.selectedGroupIndex = $parent.$index; $parent.$parent.selectedIndex = $index\"\n" +
    "          ng-mouseleave=\"$parent.$parent.selectedGroupIndex = -1; $parent.$parent.selectedIndex = -1\">{{ item.display }}</li>\n" +
    "    </ul>\n" +
    "  </li>\n" +
    "</ul>\n"
  );


  $templateCache.put('src/bulbs-autocomplete-suggest/bulbs-autocomplete-suggest/bulbs-autocomplete-suggest.html',
    "<ul>\n" +
    "  <li\n" +
    "      ng-repeat=\"item in formattedItems\"\n" +
    "      ng-click=\"onSelect(item)\"\n" +
    "      ng-class=\"{active: $index === $parent.selectedIndex}\"\n" +
    "      ng-mouseenter=\"$parent.selectedIndex = $index\"\n" +
    "      ng-mouseleave=\"$parent.selectedIndex = -1\">{{ item.display }}</li>\n" +
    "</ul>\n"
  );

}]);
