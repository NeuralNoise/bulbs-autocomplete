'use strict';

describe('Directive: bulbs-autocomplete-suggest-directive', function () {
  var
    $compile,
    $rootScope,
    $scope,
    $directiveScope,
    elementHtml,
    element,
    BULBS_AUTOCOMPLETE_EVENT_KEYPRESS;

  beforeEach(function () {
    module('BulbsAutocomplete.suggest');
    module('jsTemplates');

    elementHtml = '<bulbs-autocomplete-suggest formatter="formatter(item)" items="items" on-select="onSelect(selection)"></bulbs-autocomplete-suggest>';

    inject(function ($injector) {
      $compile = $injector.get('$compile');
      $rootScope = $injector.get('$rootScope');
      BULBS_AUTOCOMPLETE_EVENT_KEYPRESS = $injector.get('BULBS_AUTOCOMPLETE_EVENT_KEYPRESS');
      $scope = $rootScope.$new();

      $scope.onSelect = function () {
        return true;
      };

      $scope.items = [{
        name: 'bacon'
      }, {
        name: 'eggs'
      }, {
        name: 'fred'
      }, {
        name: 'wilma'
      }];

      $scope.formatter = function (item) {
        return item.name;
      };

      element = $compile(elementHtml)($scope);
      $scope.$digest();
      $directiveScope = element.isolateScope();

      spyOn($scope, 'onSelect').and.callThrough();
      spyOn($scope, 'formatter').and.callThrough();
    });
  });

  describe('when the items array changes', function () {
    it('should fire the formatter callback', function () {
      $scope.$digest();
      expect($scope.formatter).toHaveBeenCalled();
    });
  });

  describe('enter key', function () {
    var keyEnterEvent = {keyCode: 13};

    it('should call onSelect on an item the mouse has marked active', function () {
      $directiveScope.mouseActive = true;
      $directiveScope.selectedIndex = 1;

      $scope.$broadcast(BULBS_AUTOCOMPLETE_EVENT_KEYPRESS, keyEnterEvent);
      $scope.$digest();

      expect($scope.onSelect).toHaveBeenCalled();
    });

    it('should fire onSelect with a null selection if selectedIndex === -1', function () {
      $directiveScope.selectedIndex = -1;

      $scope.$broadcast(BULBS_AUTOCOMPLETE_EVENT_KEYPRESS, keyEnterEvent);

      expect($scope.onSelect).toHaveBeenCalledWith(null);
    });

    it('should fire onSelect, if selectedIndex !== -1', function () {
      $directiveScope.selectedIndex = 1;

      $scope.$broadcast(BULBS_AUTOCOMPLETE_EVENT_KEYPRESS, keyEnterEvent);

      expect($scope.onSelect).toHaveBeenCalledWith($scope.items[$directiveScope.selectedIndex]);
    });
  });

  describe('down key', function () {
    var keyDnEvent = {keyCode: 40};

    it('should not modify active state when the mouse has marked something active', function () {
      $directiveScope.mouseActive = true;
      $directiveScope.selectedIndex = 1;

      $scope.$broadcast(BULBS_AUTOCOMPLETE_EVENT_KEYPRESS, keyDnEvent);
      $scope.$digest();

      expect($directiveScope.selectedIndex).toBe(1);
    });

    it('should select the first element if the selection is empty', function () {
      $directiveScope.selectedIndex = -1;
      $scope.$broadcast(BULBS_AUTOCOMPLETE_EVENT_KEYPRESS, keyDnEvent);
      $scope.$digest();
      var selectedElement = $(element).find('ul > li:first');
      expect(selectedElement.hasClass('active')).toBe(true);
      expect($directiveScope.selectedIndex).toBe(0)
    });

    it('should clear selection if the selectedIndex is on the last element', function () {
      $directiveScope.selectedIndex = $directiveScope.items.length - 1;
      $scope.$broadcast(BULBS_AUTOCOMPLETE_EVENT_KEYPRESS, keyDnEvent);
      $scope.$digest();
      var activeElements = $(element).find('ul > li.active');
      expect(activeElements.length).toBe(0);
      expect($directiveScope.selectedIndex).toBe(-1);
    });

    it('should select the first element if selectedIndex is -1', function () {
      $scope.$broadcast(BULBS_AUTOCOMPLETE_EVENT_KEYPRESS, keyDnEvent);
      $scope.$digest();
      var selectedElement = $(element).find('ul > li:first');
      expect(selectedElement.hasClass('active')).toBe(true);
    });

    it('should select the second element if selectedIndex is 0', function () {
      $directiveScope.selectedIndex = 0;
      $scope.$broadcast(BULBS_AUTOCOMPLETE_EVENT_KEYPRESS, keyDnEvent);
      $scope.$digest();
      var selectedElement = $(element).find('ul > li:nth-child(2)');
      expect(selectedElement.hasClass('active')).toBe(true);
    });
  });

  describe('up key', function () {
    var keyUpEvent = {keyCode: 38};

    it('should not modify active state when the mouse has marked something active', function () {
      $directiveScope.mouseActive = true;
      $directiveScope.selectedIndex = 1;

      $scope.$broadcast(BULBS_AUTOCOMPLETE_EVENT_KEYPRESS, keyUpEvent);
      $scope.$digest();

      expect($directiveScope.selectedIndex).toBe(1);
    });

    it('should select the last element if selection is empty', function () {
      $directiveScope.selectedIndex = -1;
      $scope.$broadcast(BULBS_AUTOCOMPLETE_EVENT_KEYPRESS, keyUpEvent);
      $scope.$digest();
      var selectedElement = $(element).find('ul > li:last');
      expect(selectedElement.hasClass('active')).toBe(true);
      expect($directiveScope.selectedIndex).toBe($directiveScope.items.length - 1);
    });

    it('should clear selection if the selectedIndex is on the first element', function () {
      $directiveScope.selectedIndex = 0;
      $scope.$broadcast(BULBS_AUTOCOMPLETE_EVENT_KEYPRESS, keyUpEvent);
      $scope.$digest();
      var activeElements = $(element).find('ul > li.active');
      expect(activeElements.length).toBe(0);
      expect($directiveScope.selectedIndex).toBe(-1);
    });

    it('should select the second to last element if selectedIndex is the last element', function () {
      $directiveScope.selectedIndex = $directiveScope.items.length - 1;
      $scope.$broadcast(BULBS_AUTOCOMPLETE_EVENT_KEYPRESS, keyUpEvent);
      $scope.$digest();
      var selectedElement = $(element).find('ul > li:nth-child(3)');
      expect(selectedElement.hasClass('active')).toBe(true);
    });

    it('should select the last element if selectedIndex is -1', function () {
      $directiveScope.selectedIndex = -1;
      $scope.$broadcast(BULBS_AUTOCOMPLETE_EVENT_KEYPRESS, keyUpEvent);
      $scope.$digest();
      var selectedElement = $(element).find('ul > li:last');
      expect(selectedElement.hasClass('active')).toBe(true);
    });
  });
});
