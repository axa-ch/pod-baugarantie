import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { AXATableSortableReact, AXAInputTextReact } from '../../patterns-library';

import * as allActions from './actions';

class Ongoing extends PureComponent {

  componentDidMount(){
    const { tableItems, loadTableItems } = this.props;

    if (!tableItems.length) {
      loadTableItems();
    }
  }

  render() {
    const { setSearch, lastSearch, tableItems } = this.props;
    const { thead, tbody } = tableItems;

    if (!thead || !tbody) {
      return (<div className="lds-dual-ring" />);
    }

    return (
      <>
        <h1 className="o-baug__app__content-table-title">Laufende Garantiescheine</h1>
        <div className="o-baug__app__content-table-search">
          <AXAInputTextReact
            type="text"
            placeholder="Suche"
            value={lastSearch}
            onChange={({ target: { value } }) => setSearch(value)}
            name="search-table"
          />
        </div>
        <article className="o-baug__app__content-table">
          <AXATableSortableReact
            innerscroll="800"
            model={tableItems}
          />
        </article>
      </>
    );
  }
}

Ongoing.propTypes = {
  setSearch: PropTypes.func.isRequired,
  lastSearch: PropTypes.string.isRequired,
  tableItems: PropTypes.object.isRequired,
  loadTableItems: PropTypes.func.isRequired,
};

export default connect(
  state => state.ongoing,
  allActions
)(Ongoing);
