import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { AXATableSortableReact } from '../../../patterns-library';

import * as allActions from './actions';

class OngoingTable extends PureComponent {

  render() {
    const { tableItems } = this.props;
    const { thead, tbody } = tableItems;

    if (!thead || !tbody) {
      return (<div className="lds-dual-ring" />);
    }

    return (
      <>
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

OngoingTable.propTypes = {
  tableItems: PropTypes.object.isRequired,
};

export default connect(
  ({ ongoingTable }) => ({
    tableItems: ongoingTable.tableItems
  }),
  allActions
)(OngoingTable);
