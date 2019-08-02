import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  AXATableSortableReact,
  AXAButton,
  AXAInputTextReact,
} from '../../patterns-library';
// import { HashRouter as Router } from 'react-router-dom';
import { Ongoing } from './index';

import { PAGINATION_THRESHOLD } from './_config';

import { initTranslations } from '../../../i18n';

import {
  setSearch as originalSetSearch,
  handlePagination as originalHandlePagination,
} from './actions';

Enzyme.configure({ adapter: new Adapter() });

// create the store with the needed middlewears
// We dont use a mocked store cause we want to UNIT test, therefore use the
// shallow method as much as we can.
// If we wrap a useless Provider around, it wont work with shallow anymore
// and then we need to mount the whole component, including sub components which
// will go against the principle of unit testing.
class Setup {
  constructor(params) {
    if (params) {
      const {
        setSearch = jest.fn(),
        handlePagination = jest.fn(),
        loadTableItems = jest.fn(),
      } = params;
      this.setSearch = setSearch;
      this.handlePagination = handlePagination;
      this.loadTableItems = loadTableItems;
    }
    this.i18n = initTranslations('en');
  }
  get store() {
    if (!this._store) {
      const history = {
        goBack: jest.fn(),
      };
      const t = key => key;
      this._store = {
        lastSearch: '',
        pageNumber: 0,
        rowLength: 0,
        history,
        t,
        i18n: this.i18n,
        match: {
          params: {
            type: 'view',
            rowIndex: 1,
            cellIndex: 12,
          },
        },
        needsPagination: false,
        isSearching: false,
        isLoading: false,
        contractNummer: '1234',
        tableOriginalItems: {},
        tableItems: {},
      };
    }
    return this._store;
  }

  setSearch = () => {};

  handlePagination = () => {};

  loadTableItems = () => {};

  render() {
    return this._render(mount);
  }

  shallow() {
    return this._render(shallow);
  }

  _render(method) {
    const { setSearch, handlePagination, loadTableItems } = this;
    return method(
      <Ongoing
        setSearch={setSearch}
        handlePagination={handlePagination}
        loadTableItems={loadTableItems}
        {...this.store}
      />
    );
  }
}

describe('Ongoing page', () => {
  let setup = new Setup();
  afterEach(() => {
    setup = new Setup();
  });
  it('should render loading animation', () => {
    const enzymeWrapper = setup.shallow();
    expect(enzymeWrapper.hasClass('lds-dual-ring')).toBe(true);
  });
  it('should render correctly with data taken from an action', async () => {
    setup = new Setup({
      loadTableItems: () => {
        setup.store.tableItems = {
          thead: [{ html: 'Title 0', sort: 'ASC' }],
          tbody: [
            [{ html: '<span>11 Some Text</span>' }],
            [{ html: '<span>1 Some Text</span>' }],
          ],
        };
      },
    });
    // this will call loadTableItems
    setup.shallow();
    // this will add the updated store
    const enzymeWrapper = setup.shallow();
    expect(enzymeWrapper.hasClass('lds-dual-ring')).toBe(false);
    expect(enzymeWrapper.find(AXATableSortableReact).exists()).toBe(true);
    expect(
      enzymeWrapper
        .find('.o-baug__app__content-table-pagination')
        .find(AXAButton)
        .exists()
    ).toBe(false);
    expect(
      enzymeWrapper
        .find('.o-baug__app__content-table-search')
        .find(AXAInputTextReact)
        .exists()
    ).toBe(true);
  });

  it('should search and find a result', async () => {
    const SEARCH_VALUE = 'some';
    setup = new Setup({
      setSearch: text => {
        originalSetSearch(text)(
          action => {
            const { type, payload } = action;
            if (type === 'BG_ONGOING_SEARCH_SET_VALUE') {
              expect(payload.lastSearch).toBe(SEARCH_VALUE);
              expect(payload.isSearching).toBe(true);
            }
            if (type === 'BG_ONGOING_SEARCH_SET_ITEMS') {
              setup.store.tableItems = payload;
              expect(payload.tbody.length).toBe(2);
            }
          },
          () => ({
            ongoing: setup.store,
          })
        );
      },
    });
    const { store } = setup;
    store.tableOriginalItems = {
      thead: [{ html: 'Title', sort: 'ASC' }],
      tbody: [
        [{ html: `<span>Here ${SEARCH_VALUE} content 1</span>` }],
        [{ html: `<span>Here ${SEARCH_VALUE} content 2</span>` }],
      ],
    };
    store.tableItems = store.tableOriginalItems;
    const enzymeWrapper = setup.shallow();
    enzymeWrapper
      .find('.o-baug__app__content-table-search')
      .find(AXAInputTextReact)
      .simulate('change', { target: { value: SEARCH_VALUE } });

    await new Promise(resolve => {
      // action search as a timeout for debouncing. Here wait for the same amount of timeout
      // plus a 100ms treshold
      setTimeout(resolve, 400);
    });
    // re render with new data
    setup.shallow();
    expect(
      enzymeWrapper.find(AXATableSortableReact).props().model.tbody[0][0].html
    ).toContain(SEARCH_VALUE);
  });

  it('should search and not find a result', async () => {
    const SEARCH_VALUE = 'other';
    setup = new Setup({
      setSearch: text => {
        originalSetSearch(text)(
          action => {
            const { type, payload } = action;
            if (type === 'BG_ONGOING_SEARCH_SET_VALUE') {
              expect(payload.lastSearch).toBe(SEARCH_VALUE);
              expect(payload.isSearching).toBe(true);
            }
            if (type === 'BG_ONGOING_SEARCH_SET_ITEMS') {
              setup.store.tableItems = payload;
              expect(payload.tbody[0].length).toBe(0);
            }
          },
          () => ({
            ongoing: setup.store,
          })
        );
      },
    });
    const { store } = setup;
    store.tableOriginalItems = {
      thead: [{ html: 'Title', sort: 'ASC' }],
      tbody: [
        [{ html: `<span>Here some content 1</span>` }],
        [{ html: `<span>Here some content 2</span>` }],
      ],
    };
    store.tableItems = store.tableOriginalItems;
    const enzymeWrapper = setup.shallow();
    enzymeWrapper
      .find('.o-baug__app__content-table-search')
      .find(AXAInputTextReact)
      .simulate('change', { target: { value: SEARCH_VALUE } });

    await new Promise(resolve => {
      // action search as a timeout for debouncing. Here wait for the same amount of timeout
      // plus a 100ms treshold
      setTimeout(resolve, 400);
    });
    // re render with new data
    const enzymeWrapperAfterSearch = setup.shallow();
    expect(
      enzymeWrapperAfterSearch.find(AXATableSortableReact).props().model
        .tbody[0].length
    ).toBe(0);
  });

  it('pagination works correctly when pressing NEXT and PREV', async () => {
    let countClicks = 0;
    const MAX_PAGES = 3;
    setup = new Setup({
      handlePagination: command => {
        originalHandlePagination(command)(
          action => {
            const {
              payload: { tbody, pageNumber },
            } = action;
            expect(pageNumber).toBe(countClicks + 1);
            // this is if we reached last page
            if (countClicks === MAX_PAGES - 1) {
              expect(tbody.length).toBe(1);
              expect(tbody[0][0].html).toContain(
                `TEST_${MAX_PAGES * PAGINATION_THRESHOLD}_`
              );
            } else {
              expect(tbody.length).toBe(PAGINATION_THRESHOLD);
              expect(tbody[PAGINATION_THRESHOLD / 2][0].html).toContain(
                `TEST_${PAGINATION_THRESHOLD / 2 +
                  PAGINATION_THRESHOLD * (countClicks + 1)}_`
              );
            }
            setup.store.pageNumber = pageNumber;
          },
          () => ({
            ongoing: setup.store,
          })
        );
      },
    });
    const { store } = setup;

    const model = Array(PAGINATION_THRESHOLD * MAX_PAGES + 1)
      .fill()
      .map((_, i) => [{ html: `<span>Here some content TEST_${i}_</span>` }]);

    store.tableOriginalItems = {
      thead: [{ html: 'Title', sort: 'ASC' }],
      tbody: model,
    };
    store.tableItems = store.tableOriginalItems;
    store.needsPagination = true;
    store.rowLength = PAGINATION_THRESHOLD * MAX_PAGES + 1;
    const enzymeWrapper = setup.shallow();
    const prevBtn = enzymeWrapper
      .find('.o-baug__app__content-table-pagination')
      .find(AXAButton)
      .at(0);
    const nextBtn = enzymeWrapper
      .find('.o-baug__app__content-table-pagination')
      .find(AXAButton)
      .at(1);

    // go to page 2
    nextBtn.simulate('click', { target: {} });
    countClicks += 1;
    // go to page 3
    nextBtn.simulate('click', { target: {} });
    countClicks += 1;
    // go to page 4
    nextBtn.simulate('click', { target: {} });
    // second page 3
    countClicks -= 1;
    prevBtn.simulate('click', { target: {} });
    // first page 2
    countClicks -= 1;
    prevBtn.simulate('click', { target: {} });
    // first page 1
    countClicks -= 1;
    prevBtn.simulate('click', { target: {} });
  });
});
