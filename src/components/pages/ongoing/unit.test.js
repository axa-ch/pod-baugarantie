import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AXATableSortableReact } from '../../patterns-library';
// import { HashRouter as Router } from 'react-router-dom';
import { Ongoing } from './index';

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
    const { setSearch, handlePagination, loadTableItems } = this;
    return shallow(
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
    const enzymeWrapper = setup.render();
    expect(enzymeWrapper.hasClass('lds-dual-ring')).toBe(true);
  });
  it('should render table', async () => {
    setup = new Setup({
      loadTableItems: () => {
        setup.store.tableItems = {
          thead: [{ html: 'Title 0', sort: 'ASC' }],
          tbody: [[
            { html: '<span>11 Some Text</span>' },
          ],
          [
            { html: '<span>1 Some Text</span>' },
          ],]
        }
      }
    });
    // this will call loadTableItems
    setup.render();
    // this will add the updated store
    const enzymeWrapper = setup.render();
    expect(enzymeWrapper.hasClass('lds-dual-ring')).toBe(false);
    expect(enzymeWrapper.find(AXATableSortableReact).exists()).toBe(true);
  });
});
