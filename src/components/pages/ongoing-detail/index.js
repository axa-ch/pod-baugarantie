import React from 'react';
import PropTypes from 'prop-types';

const OngoingDetail = ({ match }) => (
  <article className="o-baug__app__form">
    ON DETAIL {match.params.id}
  </article>
);

OngoingDetail.propTypes = {
  match: PropTypes.object.isRequired,
};

export default OngoingDetail;
