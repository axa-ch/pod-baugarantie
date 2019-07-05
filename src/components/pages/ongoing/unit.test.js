import React from 'react';
import configureMockStore from 'redux-mock-store';
import Enzyme, { render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import Ongoing from './index';

Enzyme.configure({ adapter: new Adapter() });

// create the store with the needed middlewears
const mockStore = configureMockStore();

function setup() {
  const enzymeWrapper = render(
    <Provider
      store={mockStore({
        lastSearch: '',
        pageNumber: 0,
        rowLength: 0,
        needsPagination: false,
        isSearching: false,
        tableOriginalItems: {},
        tableItems: {},
      })}
    >
      <Router>
        <Ongoing />
      </Router>
    </Provider>
  ).dive();

  return {
    enzymeWrapper,
  };
}

describe('Ongoing page', () => {
  afterEach(() => {
    // fetchMock.restore()
  });
  it('should render', () => {
    const { enzymeWrapper } = setup();
    console.log(enzymeWrapper);
    console.log(enzymeWrapper.find('div').debug());
    expect(enzymeWrapper.find('div').hasClass('lds-dual-ring')).toBe(true);
  });
});
