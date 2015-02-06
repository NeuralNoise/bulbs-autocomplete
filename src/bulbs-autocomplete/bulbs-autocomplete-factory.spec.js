'use strict';
describe('BulbsAutocomplete Factory', function() {
  var BulbsAutocomplete;

  beforeEach(function(){
    module('BulbsAutocomplete.factory');
    inject(function(_BulbsAutocomplete_) {
      BulbsAutocomplete = _BulbsAutocomplete_;
    });
  });

  it('should error when not passed a valid getItemsFunction parameter', function(){
    expect(new BulbsAutocomplete(null, function(){})).toThrow();
  });

  it('should error when not passed a valid formatFunction parameter', function(){
    expect(new BulbsAutocomplete(function(){}), null).toThrow();
  });

  it('should call getItems and format on $retrieve', function(){
    expect(false);
  });
});
