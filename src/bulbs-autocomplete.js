angular.module('BulbsAutocomplete', [
  'BulbsAutocomplete.suggest',
  'BulbsAutocomplete.suggest.groupBy'
])
  .constant('BULBS_AUTOCOMPLETE_EVENT_KEYPRESS', 'bulbs-autocomplete-keypress');
