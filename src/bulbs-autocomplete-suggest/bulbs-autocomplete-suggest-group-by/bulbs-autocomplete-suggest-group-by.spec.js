'use strict';

describe('Directive: bulbsAutocompleteSuggestGroupBy', function () {
  var
    $scope,
    $directiveScope,
    BulbsAutocompleteFormatterService;

  beforeEach(function () {
    module('BulbsAutocomplete.suggest.formatter.service');
    module('BulbsAutocomplete.suggest.groupBy');
    module('jsTemplates');

    inject(function (_$rootScope_, $compile, _BulbsAutocompleteFormatterService_) {
       $scope = _$rootScope_.$new();
       BulbsAutocompleteFormatterService = _BulbsAutocompleteFormatterService_;

       $scope.formatter = function () {};
       $scope.grouper = function () {
         return {
           'group 1': [{
             name: 'item 1',
             value: 10
           }, {
             name: 'item 2',
             value: 20
           }],
           'group 2': [{
             name: 'item 3',
             value: 30
           }, {
             name: 'item 4',
             value: 40
           }]
         };
       };
       $scope.items = [];
       $scope.onSelect = function () {};

       spyOn(BulbsAutocompleteFormatterService, 'buildFormatter');
       spyOn($scope, 'formatter').and.callThrough();
       spyOn($scope, 'grouper').and.callThrough();
       spyOn($scope, 'onSelect').and.callThrough();

      var element = $compile('<bulbs-autocomplete-suggest-group-by formatter="formatter" grouper="grouper" items="items" on-select="onSelect"></bulbs-autocomplete-suggest-group-by>')($scope.$new());
      _$rootScope_.$digest();
      $directiveScope = element.isolateScope();
    });
  });

  it('should add grouped items to the scope when items changes', function () {
    expect(BulbsAutocompleteFormatterService.buildFormatter).toHaveBeenCalled();
    expect($scope.grouper).toHaveBeenCalled();
    expect($directiveScope.formattedGroupedItems).toBeDefined();
  });

});
