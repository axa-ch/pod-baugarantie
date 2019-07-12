import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AXATableSortableReact, AXAButton, AXAInputTextReact } from '../../patterns-library';
// import { HashRouter as Router } from 'react-router-dom';
import { Ongoing } from './index';

import { setSearch as originalSetSearch } from './actions';

Enzyme.configure({ adapter: new Adapter() });

// create the store with the needed middlewears
class Setup {
  constructor(params) {
    if (params) {
      const {
        setSearch = jest.fn(),
        handlePagination = jest.fn(),
        loadTableItems = jest.fn()
      } = params;
      this.setSearch = setSearch;
      this.handlePagination = handlePagination;
      this.loadTableItems = loadTableItems;
    }


  }
  get store()  {
    if (!this._store) {
      const history = {
        goBack: jest.fn()
      };
      this._store = {
        lastSearch: '',
        pageNumber: 0,
        rowLength: 0,
        history,
        match: {
          params: {}
        },
        needsPagination: false,
        isSearching: false,
        tableOriginalItems: {},
        tableItems: {},
      };
    }
    return this._store;
  }

  setSearch = () => {

  }

  handlePagination = () => {

  }

  loadTableItems = () =>  {

  }

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
          tbody: [[
            { html: '<span>11 Some Text</span>' },
          ],
          [
            { html: '<span>1 Some Text</span>' },
          ]]
        }
      }
    });
    // this will call loadTableItems
    setup.shallow();
    // this will add the updated store
    const enzymeWrapper = setup.shallow();
    expect(enzymeWrapper.hasClass('lds-dual-ring')).toBe(false);
    expect(enzymeWrapper.find(AXATableSortableReact).exists()).toBe(true);
    expect(
      enzymeWrapper.find('.o-baug__app__content-table-pagination')
        .find(AXAButton)
        .exists()
    ).toBe(false);
    expect(
      enzymeWrapper.find('.o-baug__app__content-table-search')
        .find(AXAInputTextReact)
        .exists()
    ).toBe(true);
  });

  it('should search and find a result', async () => {
    const SEARCH_VALUE = 'some';
    setup = new Setup({
      setSearch: (text) => {
        originalSetSearch(text)((action) => {
          const { type, payload } = action;
          if (type === 'BG_ONGOING_SEARCH_SET_VALUE') {
            expect(payload.lastSearch).toBe(SEARCH_VALUE);
            expect(payload.isSearching).toBe(true);
          }
          if (type === 'BG_ONGOING_SEARCH_SET_ITEMS') {
            setup.store.tableItems = payload;
            expect(payload.tbody.length).toBe(2);
          }
        }, () => ({
          ongoing: setup.store
        }));
      }
    });
    const { store } = setup;
    store.tableOriginalItems = {
      thead: [{ html: 'Title', sort: 'ASC' }],
      tbody: [[
        { html: `<span>Here ${SEARCH_VALUE} content 1</span>` },
      ],
      [
        { html: `<span>Here ${SEARCH_VALUE} content 2</span>` },
      ]]
    }
    store.tableItems = store.tableOriginalItems;
    const enzymeWrapper = setup.shallow();
    enzymeWrapper.find('.o-baug__app__content-table-search')
      .find(AXAInputTextReact)
      .simulate('change', { target: { value: SEARCH_VALUE} });

    await new Promise((resolve) => {
      // action search as a timeout for debouncing. Here wait for the same amount of timeout
      // plus a 100ms treshold
      setTimeout(resolve, 400);
    });
    // re render with new data
    setup.shallow();
    expect(
      enzymeWrapper
        .find(AXATableSortableReact)
        .props().model.tbody[0][0].html
    ).toContain(SEARCH_VALUE);
  });

  it('should search and not find a result', async () => {
    const SEARCH_VALUE = 'other';
    setup = new Setup({
      setSearch: (text) => {
        originalSetSearch(text)((action) => {
          const { type, payload } = action;
          if (type === 'BG_ONGOING_SEARCH_SET_VALUE') {
            expect(payload.lastSearch).toBe(SEARCH_VALUE);
            expect(payload.isSearching).toBe(true);
          }
          if (type === 'BG_ONGOING_SEARCH_SET_ITEMS') {
            setup.store.tableItems = payload;
            expect(payload.tbody[0].length).toBe(0);
          }
        }, () => ({
          ongoing: setup.store
        }));
      }
    });
    const { store } = setup;
    store.tableOriginalItems = {
      thead: [{ html: 'Title', sort: 'ASC' }],
      tbody: [[
        { html: `<span>Here some content 1</span>` },
      ],
      [
        { html: `<span>Here some content 2</span>` },
      ]]
    }
    store.tableItems = store.tableOriginalItems;
    const enzymeWrapper = setup.shallow();
    enzymeWrapper.find('.o-baug__app__content-table-search')
      .find(AXAInputTextReact)
      .simulate('change', { target: { value: SEARCH_VALUE} });

    await new Promise((resolve) => {
      // action search as a timeout for debouncing. Here wait for the same amount of timeout
      // plus a 100ms treshold
      setTimeout(resolve, 400);
    });
    // re render with new data
    const enzymeWrapperAfterSearch = setup.shallow();
    expect(
      enzymeWrapperAfterSearch
        .find(AXATableSortableReact)
        .props().model.tbody[0].length
    ).toBe(0);
  });
});
