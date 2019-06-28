import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AXATableSortableReact, AXAInputTextReact, AXAButton } from '../../patterns-library';
import * as allActions from './actions';
import { PREV, NEXT } from './_config';

class Ongoing extends PureComponent {

  componentDidMount(){
    const { tableItems, loadTableItems } = this.props;

    if (!tableItems.length) {
      loadTableItems();
    }
  }

  render() {
    const {
      setSearch,
      lastSearch,
      tableItems,
      needsPagination,
      pageNumber,
      rowLength,
      handlePagination,
    } = this.props;
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
            onChange={({ target: { value } }) => (lastSearch === value) ? () => {} : setSearch(value)}
            name="search-table"
          />
        </div>
        {needsPagination ? (
          <div className="o-baug__app__content-table-pagination">
            <AXAButton
              type="button"
              disabled={pageNumber === 0}
              onClick={() => { handlePagination(PREV) }}
              variant="secondary"
            >
              {'<<'}
            </AXAButton>
            <span className="o-baug__app__content-table-pagination-text">
              Seite {pageNumber + 1} von {Math.floor(rowLength) + 1}
            </span>
            <AXAButton
              type="button"
              onClick={() => { handlePagination(NEXT) }}
              disabled={pageNumber >= rowLength}
              variant="secondary"
            >
              {'>>'}
            </AXAButton>
          </div>
        ) : ''}
        <article className="o-baug__app__content-table">
          <AXATableSortableReact
            innerscroll="800"
            maxheight="600"
            model={tableItems}
          />
        </article>
      </>
    );
  }
}

Ongoing.propTypes = {
  setSearch: PropTypes.func.isRequired,
  handlePagination: PropTypes.func.isRequired,
  lastSearch: PropTypes.string.isRequired,
  tableItems: PropTypes.object.isRequired,
  pageNumber: PropTypes.number.isRequired,
  rowLength: PropTypes.number.isRequired,
  needsPagination: PropTypes.bool.isRequired,
  loadTableItems: PropTypes.func.isRequired,
};

export default connect(
  state => state.ongoing,
  allActions
)(Ongoing);
