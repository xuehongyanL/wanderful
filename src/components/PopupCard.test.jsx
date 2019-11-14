import React from 'react';
import {mount} from 'enzyme';
import _ from 'lodash';

import emitter from '../ev';
import PopupCard from './PopupCard';
import {createEvent} from '../utils/createEvent';
import {featureConfig} from '../config';

describe('PopupCard', () => {
  const mockFunc = jest.fn();
  emitter.on('editObj', mockFunc);
  const mockRef = {current: {leafletElement: {options: {leaflet: {map: {closePopup: mockFunc}}}}}};
  const testFeature1 = {'type': 'Feature', 'properties': {}, 'geometry': {'type': 'Point', 'coordinates': [-0.08356532689164366, 51.51300494732007]}};
  const testFeature2 = {'type': 'Feature', 'properties': {'color': '#123456', 'weight': 120, 'opacity': 0.233, 'radius': 20, 'fillColor': '#654321', 'fillOpacity': 0.05}, 'geometry': {'type': 'Point', 'coordinates': [-0.08356532689164366, 51.51300494732007]}};
  const saveButton = (wrapper) => (wrapper.find({color: 'warning'}));
  const cancelButton = (wrapper) => (wrapper.find({color: 'secondary'}));
  const deleteButton = (wrapper) => (wrapper.find({color: 'danger'}));
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Generate default', () => {
    const wrapper = mount(
      <PopupCard
        feature={testFeature1}
        validKeys={featureConfig.validKeys['Point']}
        closeRef={mockRef}
      />
    );
    _.forEach(featureConfig.validKeys['Point'], (key) => {
      expect(wrapper.find({inputkey: key}).at(1).props().value).toEqual(featureConfig.default[key]);
    });
  });
  it('Generate custom', () => {
    const wrapper = mount(
      <PopupCard
        feature={testFeature2}
        validKeys={featureConfig.validKeys['Point']}
        closeRef={mockRef}
      />
    );
    _.forEach(featureConfig.validKeys['Point'], (key) => {
      expect(wrapper.find({inputkey: key}).at(1).props().value).toEqual(testFeature2.properties[key]);
    });
  });
  it('Edit and save', () => {
    const wrapper = mount(
      <PopupCard
        feature={testFeature1}
        validKeys={featureConfig.validKeys['Point']}
        closeRef={mockRef}
      />
    );
    _.forEach(featureConfig.validKeys['Point'], (key) => {
      let input = wrapper.find({inputkey: key}).at(1);
      input.simulate('change', {target: {value: testFeature2.properties[key].toString()}});
    });
    wrapper.update();
    expect(wrapper.state()).toEqual(testFeature2.properties);
    saveButton(wrapper).simulate('click');

    expect(mockFunc.mock.calls.length).toEqual(1);
    expect(mockFunc.mock.calls[0][0]).toEqual(createEvent({
      'type': 'Feature',
      'properties': testFeature2.properties,
      'geometry': testFeature1.geometry
    }));
  });
  it('Edit and throw error', () => {
    const wrapper = mount(
      <PopupCard
        feature={testFeature1}
        validKeys={featureConfig.validKeys['Point']}
        closeRef={mockRef}
      />
    );

    let opacityInput = wrapper.find({inputkey: 'opacity'});
    opacityInput.at(1).simulate('change', {target: {value: 1.5}});
    wrapper.update();
    saveButton(wrapper).simulate('click');

    let fillOpacityInput = wrapper.find({inputkey: 'fillOpacity'});
    fillOpacityInput.at(1).simulate('change', {target: {value: -0.01}});
    wrapper.update();
    saveButton(wrapper).simulate('click');

    opacityInput.at(1).simulate('change', {target: {value: 0}});
    fillOpacityInput.at(1).simulate('change', {target: {value: 0}});
    wrapper.update();
    saveButton(wrapper).simulate('click');

    expect(mockFunc.mock.calls.length).toEqual(1);
    expect(mockFunc.mock.calls[0][0]).toEqual(createEvent({
      'type': 'Feature',
      'properties': {'opacity': 0, 'fillOpacity': 0},
      'geometry': testFeature1.geometry
    }));
  });
  it('Cancel', () => {
    const wrapper = mount(
      <PopupCard
        feature={testFeature2}
        validKeys={featureConfig.validKeys['Point']}
        closeRef={mockRef}
      />
    );

    cancelButton(wrapper).simulate('click');
    expect(mockFunc.mock.calls.length).toEqual(1);
  });
  it('Delete', (end) => {
    const wrapper = mount(
      <PopupCard
        feature={testFeature2}
        validKeys={featureConfig.validKeys['Point']}
        closeRef={mockRef}
      />
    );

    emitter.on('deleteObj', (data) => {
      expect(data).toEqual(createEvent({
        'type': 'Feature',
        'properties': {},
        'geometry': testFeature2.geometry
      }));
      end();
    });
    deleteButton(wrapper).simulate('click');
  });
});