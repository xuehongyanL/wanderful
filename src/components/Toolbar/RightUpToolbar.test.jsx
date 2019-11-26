import React from 'react';
import {mount} from 'enzyme';
import {Button, Input} from 'reactstrap';

import emitter from '../../ev';
import RightUpToolbar, {RightUpToolbarUnwrapped} from './RightUpToolbar';

describe('Right up toolbar', () => {
  const wrapper = mount(
    <RightUpToolbar />, {attachTo: document.body}
  );
  it('Import', (end) => {
    const importMock = jest.fn();
    emitter.on('text', () => {end();});
    wrapper.find(RightUpToolbarUnwrapped).instance()._onImport();
    wrapper.find(Input).simulate('change', {
      target: {files: {length: 1, 0: new File(['foo', 'bar'], 'foobar.txt')}}
    });
  });
  it('Export', () => {
    const exportMock = jest.fn();
    emitter.on('save', exportMock);
    wrapper.find(RightUpToolbarUnwrapped).instance()._onExport();
    expect(exportMock.mock.calls.length).toEqual(1);
  });
});