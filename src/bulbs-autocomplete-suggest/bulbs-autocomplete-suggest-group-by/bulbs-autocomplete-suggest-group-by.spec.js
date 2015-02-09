'use strict';

describe('Directive: bulbsAutocompleteSuggestGroupBy', function () {
  var
    $scope,
    $directiveScope;

  beforeEach(function () {
    module('BulbsAutocomplete.suggest.formatter.service');
    module('BulbsAutocomplete.suggest.groupBy');
    module('jsTemplates');

    inject(function (_$rootScope_, $compile) {
       $scope = _$rootScope_.$new();

       $scope.formatter = function () {};
       $scope.grouper = function () {};
       $scope.items = [];
       $scope.onSelect = function () {};

       spyOn($scope, 'formatter');
       spyOn($scope, 'grouper');
       spyOn($scope, 'onSelect');

      var element = $compile('<bulbs-autocomplete-suggest-group-by formatter="formatter" ></bulbs-autocomplete-suggest-group-by>')($scope.$new());
      _$rootScope_.$digest();
      $directiveScope = element.isolateScope();
    });
  });

  it('should ', function () {

  // TODO : fill this in
    throw 'Not implemented yet.';
  });
});
