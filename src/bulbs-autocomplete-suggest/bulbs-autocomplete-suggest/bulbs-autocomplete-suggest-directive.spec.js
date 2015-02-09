'use strict';

describe('Directive: bulbs-autocomplete-suggest-directive', function () {
  var $compile,
    $rootScope,
    $scope,
    suggestScope,
    elementHtml,
    element,
    BulbsAutocompleteFormatterService;

  beforeEach(function () {
    module('BulbsAutocomplete.suggest');
    module('jsTemplates');
    elementHtml = '<bulbs-autocomplete-suggest formatter="formatter" items="items" on-select="onSelect"></bulbs-autocomplete-suggest>';
    inject(function ($injector) {
      $compile = $injector.get('$compile');
      $rootScope = $injector.get('$rootScope');
      BulbsAutocompleteFormatterService = $injector.get('BulbsAutocompleteFormatterService');
      $scope = $rootScope.$new();


      $scope.onSelect = function (eggs) {
        return true;
      };

      $scope.items = [{
        'name': 'baocn'
      }, {
        'name': 'eggs'
      }, {
        'name': 'fred'
      }, {
        'name': 'wilma'
      }];

      $scope.formatter = function (items) {
        return items;
      };

      spyOn(BulbsAutocompleteFormatterService, 'buildFormatter').and.callThrough();
      element = $compile(elementHtml)($scope);
      $scope.$digest();
      suggestScope = element.isolateScope();
      spyOn(suggestScope, 'onSelect').and.callThrough();
    });
  });


  describe('when the items array changes', function () {
    it('should fire the formatter callback', function () {
      $scope.$digest();
      expect(BulbsAutocompleteFormatterService.buildFormatter).toHaveBeenCalled();
    });
  });


  describe('Enter key', function () {
    it('should not fire onSelect if selectedIndex === -1', function () {
      suggestScope.selectedIndex = -1;

      $scope.$broadcast('bulbs-autocomplete-keypress', {
        'keyCode': 13
      });

      expect(suggestScope.onSelect).not.toHaveBeenCalled();

    });

    it('should fire onSelect, if selectedIndex !== -1', function () {
      suggestScope.selectedIndex = 1;
      $scope.$broadcast('bulbs-autocomplete-keypress', {
        'keyCode': 13
      });
      expect(suggestScope.onSelect).toHaveBeenCalled();
    });
  });

  describe('Down key', function () {

  });

  describe('Up key', function () {

  });

  describe('Left key', function () {

  });

  describe('Right key', function () {

  });
});
