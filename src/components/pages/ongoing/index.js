import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation, Trans } from 'react-i18next';
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

export class Ongoing extends PureComponent {
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
      t,
      rowLength,
      handlePagination,
    } = this.props;
    const { thead, tbody } = tableItems;

    if (!thead || !tbody) {
      return (<div className="lds-dual-ring" />);
    }

    const { type, rowIndex, cellIndex } = match.params;

    const realPageNumber = pageNumber + 1;
    const realTotPages = Math.floor(rowLength) + 1;

    return (
      < >
        <h1 className="o-baug__app__content-table-title">{t('bg.ongoing.current_guarantees')}</h1>
        <Modal
          isOpen={!!type}
          onAfterOpen={() => {console.log('onAfterOpen')}}
          onRequestClose={() => { history.goBack(); }}
          style={customStyles}
          ariaHideApp={false}
          contentLabel={t('bg.ongoing.modal_label')}
        >
          <Trans i18nKey="bg.ongoing.modal_desc">
            Gutescheine {{type}} auf zeile {{rowIndex}} und spalte {{cellIndex}}
          </Trans>
        </Modal>
        <PoliceDetail />
        <section className="o-baug__app__content-table-section">
          <div className="o-baug__app__content-table-search">
            <AXAInputTextReact
              type="text"
              placeholder={t('bg.search.placeholder')}
              checkMark={!!lastSearch}
              value={lastSearch}
              onChange={({ target: { value } }) => (lastSearch === value) ? () => {} : setSearch(value)}
              name="search-table"
            />
          </div>
          <div className="o-baug__app__content-table-pagination">
            {needsPagination ? (
              <>
                <AXAButton
                  type="button"
                  disabled={pageNumber === 0}
                  onClick={() => { handlePagination(PREV) }}
                  variant="secondary"
                >
                  {'<<'}
                </AXAButton>

                <span className="o-baug__app__content-table-pagination-text">
                  <Trans i18nKey="bg.ongoing.page_count">
                    Seite {{realPageNumber}} von {{realTotPages}}
                  </Trans>
                </span>
                <AXAButton
                  type="button"
                  onClick={() => { handlePagination(NEXT) }}
                  disabled={pageNumber >= rowLength}
                  variant="secondary"
                >
                  {'>>'}
                </AXAButton>
              </>
            ) : ''}
          </div>
          <article className="o-baug__app__content-table">
            <AXATableSortableReact
              innerscroll="800"
              maxheight="600"
              model={tableItems}
            />
          </article>
        </section>
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
  t: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
  rowLength: PropTypes.number.isRequired,
  needsPagination: PropTypes.bool.isRequired,
  loadTableItems: PropTypes.func.isRequired,
};

export default connect(
  state => state.ongoing,
  allActions
)(withRouter(withTranslation()(Ongoing)));
