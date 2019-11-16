import React from 'react';
import {mount, render} from 'enzyme';

import emitter from './ev';
import Editor from './Editor';
import {geojsonTransform} from './geojson';

jest.mock('./geojson/transform');

describe('Editor', () => {
  const mockFunc = jest.fn();
  const wrapper = mount(<Editor onUpdate={mockFunc} />);
  const testTxt1 = 'asfahlgahlashdglahklgad\nasfhasdghsa;glasdgasdadghslahgldg\nfghd';
  const testTxt2 = 'ahlaSAFH11151df\nsgsdhhdglahkd\nasfh\nasghs;gasdg$*())ashgldg\nh';
  beforeEach(() => {
    jest.clearAllMocks();
    emitter.emit('text', testTxt1);
    wrapper.update();
  });
  it('Outer update handler', () => {
    expect(mockFunc.mock.calls.length).toEqual(1);
    expect(mockFunc.mock.calls[0][0]).toEqual(testTxt1);
    expect(wrapper.state('value')).toEqual(testTxt1);
  });
  it('Inner change handler', () => {
    wrapper.instance()._onChange(testTxt2);
    expect(mockFunc.mock.calls.length).toEqual(2);
    expect(mockFunc.mock.calls[1][0]).toEqual(testTxt2);
    expect(wrapper.state('value')).toEqual(testTxt2);
  });
  it('Blur handler', () => {
    wrapper.instance()._onBlur(testTxt2);
    expect(geojsonTransform.mock.calls.length).toEqual(1);
    expect(geojsonTransform.mock.calls[0][0]).toEqual(testTxt1);
  });
});