'use strict';

describe('BulbsAutocomplete Formatter Service', function () {
  var formatterService,
    formatterFunction;

  beforeEach(function () {
    module('BulbsAutocomplete.suggest.formatter.service');
    inject(function (BulbsAutocompleteFormatterService) {
      formatterFunction = {};
      formatterFunction.func = function () {
        return 'bacon';
      };
      formatterService = BulbsAutocompleteFormatterService.buildFormatter(formatterFunction.func);
    });
  });

  var item = {
    'name': 'eggs'
  };

  it('should set the display property on the new object', function () {
    var newItem = formatterService(item);
    expect(newItem.display).toBe('bacon');
  });

  it('should not modify the original object', function () {
    formatterService(item);
    expect(item.display).not.toBeDefined();
  });
});
