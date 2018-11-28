import React from 'react';
import { injectIntl } from 'react-intl';

const topoComponent = (props) => {
  const { intl } = props;
  return (
      <div>{ intl.formatMessage({id: 'topo.title'}) }</div>
  );
};

export default injectIntl(topoComponent);