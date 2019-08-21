import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation, Trans } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import '@axa-ch/link/lib/index';
import {
  AXATableSortableReact,
  AXAInputTextReact,
  AXAButton,
} from '../../patterns-library';
import * as allActions from './actions';
import { PREV, NEXT } from './_config';
import PoliceDetail from '../../molecules/police-detail';
import Form from '../../organisms/form';

const customStyles = {
  content: {
    top: 'calc(50% + 80px)',
    left: '50%',
    right: 'auto',
    width: '70%',
    minWidth: '350px',
    bottom: 'auto',
    overflow: 'auto',
    marginRight: '-50%',
    borderRadius: '0px',
    transform: 'translate(-50%, -50%)',
  },
};

export class Ongoing extends PureComponent {
  componentDidMount() {
    const { tableItems, loadTableItems, contractNummer } = this.props;

    if (!tableItems.length && contractNummer) {
      loadTableItems(contractNummer);
    }
  }

  componentWillReceiveProps({ contractNummer: newContractNumber }) {
    const { contractNummer, loadTableItems } = this.props;
    if (contractNummer !== newContractNumber) {
      loadTableItems(newContractNumber);
    }
  }

  addLink(table) {
    const { t } = this.props;

    const tbody = table.tbody.map((row, rowIndex) => {
      const specialCell = row.find(cell => !!cell.interaction);
      if (specialCell) {
        const index = row.indexOf(specialCell);
        const { interaction } = specialCell;
        const { type } = interaction;
        const url =
          type === 'pdf'
            ? interaction.url
            : `/#/ongoing/${type}/${rowIndex}/${index}`;
        specialCell.html = `
          <axa-link ${type === 'pdf' ? 'external' : ''} href="${url}">
            ${t(`bg.ongoing.table_actions.${specialCell.html}`)}
          </axa-link>
        `;
        // once interaction has been rendered, dont flag it as interaction anymore
        delete specialCell.interaction;
        row[index] = specialCell;
        return row;
      }

      return row;
    });

    table.tbody = tbody;

    return table;
  }

  render() {
    const {
      setSearch,
      lastSearch,
      tableItems: preRenderTable,
      needsPagination,
      pageNumber,
      match,
      isLoading,
      isSearching,
      contractNummer,
      history,
      t,
      rowLength,
      handlePagination,
    } = this.props;

    const { thead, tbody } = preRenderTable;

    if (!thead || !tbody || isLoading) {
      return <div className="lds-dual-ring" />;
    }

    return <div className="brake-my-test" />;

    const tableItems = this.addLink(preRenderTable);

    const { type, rowIndex, cellIndex } = match.params;

    const realPageNumber = pageNumber + 1;
    const realTotPages = Math.floor(rowLength) + 1;

    const searchingHtml = (isSearching ? (<div className="lds-dual-ring" />) : (
      <p>{t('bg.ongoing.no_results')}</p>
    ))

    return (
      <>
        <h1 className="o-baug__app__content-table-title">
          {t('bg.ongoing.current_guarantees')}
        </h1>
        <Modal
          isOpen={!!type}
          onAfterOpen={() => {
            console.log('onAfterOpen');
          }}
          onRequestClose={() => {
            history.goBack();
          }}
          style={customStyles}
          ariaHideApp={false}
          contentLabel={t('bg.ongoing.modal_label')}
        >
          {/**
            For some reasons, <Trans> react-i18next with enzyme shallow rendering
            here wont work with type, rowIndex, cellIndex but would with
            realPageNumber.. Also mocking the whole npm module brings to nowhere.
            The only way it works is when writing it as below.
          */}
          <Trans
            values={{ type, rowIndex, cellIndex }}
            i18nKey="bg.ongoing.modal_desc"
            defaults="Gutescheine {{type}} auf zeile {{rowIndex}} und spalte {{cellIndex}}"
          />
          <Form contractNummer={contractNummer} mode={type} />
        </Modal>
        <PoliceDetail contractNummer={contractNummer} />
        <section className="o-baug__app__content-table-section">
          <div className="o-baug__app__content-table-search">
            <AXAInputTextReact
              type="text"
              placeholder={t('bg.search.placeholder')}
              checkMark={!!lastSearch}
              value={lastSearch}
              onChange={({ target: { value } }) =>
                lastSearch === value ? () => {} : setSearch(value)
              }
              name="search-table"
            />
          </div>
          <div className="o-baug__app__content-table-pagination">
            {needsPagination ? (
              <>
                <AXAButton
                  type="button"
                  disabled={pageNumber === 0}
                  onClick={() => {
                    handlePagination(PREV);
                  }}
                  variant="secondary"
                >
                  {'<<'}
                </AXAButton>

                <span className="o-baug__app__content-table-pagination-text">
                  <Trans i18nKey="bg.ongoing.page_count">
                    Seite {{ realPageNumber }} von {{ realTotPages }}
                  </Trans>
                </span>
                <AXAButton
                  type="button"
                  onClick={() => {
                    handlePagination(NEXT);
                  }}
                  disabled={pageNumber >= rowLength}
                  variant="secondary"
                >
                  {'>>'}
                </AXAButton>
              </>
            ) : (
              ''
            )}
          </div>
          {
            (tableItems && tableItems.tbody && tableItems.tbody[0].length) ? (
              <article className="o-baug__app__content-table">
                <AXATableSortableReact
                  innerscroll="800"
                  maxheight="600"
                  model={tableItems}
                />
              </article>
            ) : searchingHtml
          }

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
  contractNummer: PropTypes.string.isRequired,
  rowLength: PropTypes.number.isRequired,
  needsPagination: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  isSearching: PropTypes.bool,
  loadTableItems: PropTypes.func.isRequired,
};

Ongoing.defaultProps = {
  isLoading: false,
  isSearching: false,
}

export default connect(
  state => state.ongoing,
  allActions
)(withRouter(withTranslation()(Ongoing)));
