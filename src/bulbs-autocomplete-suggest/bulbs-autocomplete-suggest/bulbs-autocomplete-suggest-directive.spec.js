'use strict';

describe('Directive: bulbs-autocomplete-suggest-directive', function () {
  var
    $compile,
    $rootScope,
    $scope,
    suggestScope,
    elementHtml,
    element,
    BULBS_AUTOCOMPLETE_EVENT_KEYPRESS,
    BulbsAutocompleteFormatterService;

  beforeEach(function () {
    module('BulbsAutocomplete.suggest');
    module('jsTemplates');
    elementHtml = '<bulbs-autocomplete-suggest formatter="formatter" items="items" on-select="onSelect(selection)"></bulbs-autocomplete-suggest>';
    inject(function ($injector) {
      $compile = $injector.get('$compile');
      $rootScope = $injector.get('$rootScope');
      BULBS_AUTOCOMPLETE_EVENT_KEYPRESS = $injector.get('BULBS_AUTOCOMPLETE_EVENT_KEYPRESS');
      BulbsAutocompleteFormatterService = $injector.get('BulbsAutocompleteFormatterService');
      $scope = $rootScope.$new();

      $scope.onSelect = function () {
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

      $scope.$broadcast(BULBS_AUTOCOMPLETE_EVENT_KEYPRESS, {
        'keyCode': 13
      });

      expect(suggestScope.onSelect).not.toHaveBeenCalled();

    });

    it('should fire onSelect, if selectedIndex !== -1', function () {
      suggestScope.selectedIndex = 1;
      $scope.$broadcast(BULBS_AUTOCOMPLETE_EVENT_KEYPRESS, {
        'keyCode': 13
      });
      expect(suggestScope.onSelect).toHaveBeenCalled();
    });

  });

  describe('Down key', function () {
    it('should select the first element if the selectedIndex is on the last element', function () {
      suggestScope.selectedIndex = suggestScope.items.length - 1;
      $scope.$broadcast(BULBS_AUTOCOMPLETE_EVENT_KEYPRESS, {
        'keyCode': 40
      });
      $scope.$digest();
      var selectedElement = $(element).find('ul > li:first');
      expect(selectedElement.hasClass('active')).toBe(true);
    });

    it('should select the first element if selectedIndex is -1', function () {
      $scope.$broadcast(BULBS_AUTOCOMPLETE_EVENT_KEYPRESS, {
        'keyCode': 40
      });
      $scope.$digest();
      var selectedElement = $(element).find('ul > li:first');
      expect(selectedElement.hasClass('active')).toBe(true);
    });

    it('should select the second element if selectedIndex is 0', function () {
      suggestScope.selectedIndex = 0;
      $scope.$broadcast(BULBS_AUTOCOMPLETE_EVENT_KEYPRESS, {
        'keyCode': 40
      });
      $scope.$digest();
      var selectedElement = $(element).find('ul > li:nth-child(2)');
      expect(selectedElement.hasClass('active')).toBe(true);
    });
  });

  describe('Up key', function () {
    it('should select the last element if the selectedIndex is on the first element', function () {
      suggestScope.selectedIndex = 0;
      $scope.$broadcast(BULBS_AUTOCOMPLETE_EVENT_KEYPRESS, {
        'keyCode': 38
      });
      $scope.$digest();
      var selectedElement = $(element).find('ul > li:last');
      expect(selectedElement.hasClass('active')).toBe(true);
    });

    it('should select the second to last element if selectedIndex is the last element', function () {
      suggestScope.selectedIndex = suggestScope.items.length - 1;
      $scope.$broadcast(BULBS_AUTOCOMPLETE_EVENT_KEYPRESS, {
        'keyCode': 38
      });
      $scope.$digest();
      var selectedElement = $(element).find('ul > li:nth-child(3)');
      expect(selectedElement.hasClass('active')).toBe(true);
    });

    it('should select the last element if selectedIndex is -1', function () {
      suggestScope.selectedIndex = -1;
      $scope.$broadcast(BULBS_AUTOCOMPLETE_EVENT_KEYPRESS, {
        'keyCode': 38
      });
      $scope.$digest();
      var selectedElement = $(element).find('ul > li:last');
      expect(selectedElement.hasClass('active')).toBe(true);
    });
  });
});
