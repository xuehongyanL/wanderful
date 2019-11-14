import React from 'react';
import {mount, render} from 'enzyme';

import Editor from './Editor';
import emitter from './ev';

describe('Editor', () => {
  const mockFunc = jest.fn();
  const wrapper = mount(<Editor onUpdate={mockFunc} />);
  const testTxt = 'asfahlgahlashdglahklgad\nasfhasdghsa;glasdgasdadghslahgldg\nfghd';
  beforeEach(() => {
    emitter.emit('text', testTxt);
    wrapper.update();
  });
  it('Update function', () => {
    expect(mockFunc.mock.calls.length).toEqual(1);
    expect(mockFunc.mock.calls[0][0]).toEqual(testTxt);
    expect(wrapper.state('value')).toEqual(testTxt);
  });
});