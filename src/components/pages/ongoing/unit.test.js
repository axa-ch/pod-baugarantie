import React from 'react';
import { shallow } from 'enzyme';

import { AXAButton } from '../../patterns-library';

describe('AXA Button Test', () => {
  it('contains 2 AXAButton', () => {
    const wrapper = shallow(
      <div>
        <AXAButton />
        <AXAButton />
      </div>
    );
    expect(wrapper.find(AXAButton).length).toEqual(2);
  });
});
