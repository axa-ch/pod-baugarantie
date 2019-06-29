import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import '@axa-ch/link/lib/index';
import { AXATableSortableReact, AXAInputTextReact, AXAButton } from '../../patterns-library';
import * as allActions from './actions';
import { PREV, NEXT } from './_config';
import PoliceDetail from '../../molecules/police-detail';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    borderRadius          : '0px',
    transform             : 'translate(-50%, -50%)'
  }
};

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
      match,
      history,
      rowLength,
      handlePagination,
    } = this.props;
    const { thead, tbody } = tableItems;

    if (!thead || !tbody) {
      return (<div className="lds-dual-ring" />);
    }

    const { type, rowIndex, cellIndex } = match.params;

    return (
      < >
        <h1 className="o-baug__app__content-table-title">Laufende Garantiescheine</h1>
        <Modal
          isOpen={!!type}
          onAfterOpen={() => {console.log('onAfterOpen')}}
          onRequestClose={() => { history.goBack(); }}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Example Modal"
        >
          Gutescheine {type} auf zeile {rowIndex} und spalte {cellIndex}
        </Modal>
        <PoliceDetail />
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
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  pageNumber: PropTypes.number.isRequired,
  rowLength: PropTypes.number.isRequired,
  needsPagination: PropTypes.bool.isRequired,
  loadTableItems: PropTypes.func.isRequired,
};

export default connect(
  state => state.ongoing,
  allActions
)(withRouter(Ongoing));
