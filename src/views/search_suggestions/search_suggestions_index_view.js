import app from 'ampersand-app';
import BaseView from '../base_view';
import SearchSuggestionsIndexTemplate from '../../templates/search_suggestions/index.html';
import SearchSuggestionsCollection from '../../collections/search_suggestions';
import SearchSuggestionsItemView from './search_suggestions_item_view';
import searchSuggestionsAdapter from '../../adapters/search_suggestions_adapter';

export default BaseView.extend({
  template: SearchSuggestionsIndexTemplate,

  initialize() {
    this.adapter = searchSuggestionsAdapter;
    this.listenTo(this.adapter.combinedSuggestions, 'reset', this.render);
  },

  afterRender() {
    this.removeSubviews();
    const items = this.sliceCollection(this.adapter.combinedSuggestions,
                                     SearchSuggestionsCollection, 1, 3);
    this.renderCollection(items, SearchSuggestionsItemView,
                          '.combined-search-suggestions');
    items.length ? this.show() : this.hide(); // eslint-disable-line no-unused-expressions
    app.trigger('needs-resized');
  }
});
