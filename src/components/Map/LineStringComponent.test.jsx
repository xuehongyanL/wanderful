import React from 'react';
import {mount} from 'enzyme';
import {FeatureGroup, Map, Polyline} from 'react-leaflet';

import createLineStringComponent from './LineStringComponent';
import {featureConfig} from '../../config';
import {
  lineStringFeature1,
  lineStringFeature2,
  lineStringFeature3
} from '../../../__test__/data/features/LineString';

jest.mock('leaflet');

describe('LineStringComponent', () => {
  it('Generate default', () => {
    const wrapper = mount(<Map><FeatureGroup>{createLineStringComponent(lineStringFeature1)}</FeatureGroup></Map>);
    expect(wrapper.find(Polyline).props().color).toEqual(featureConfig.default.color);
    expect(wrapper.find(Polyline).props().weight).toEqual(featureConfig.default.weight);
    expect(wrapper.find(Polyline).props().opacity).toEqual(featureConfig.default.opacity);
    expect(wrapper.find(Polyline).props().radius).toEqual(undefined);
    expect(wrapper.find(Polyline).props().fillColor).toEqual(undefined);
    expect(wrapper.find(Polyline).props().fillOpacity).toEqual(undefined);
  });
  it('Generate custom', () => {
    const wrapper = mount(<Map><FeatureGroup>{createLineStringComponent(lineStringFeature2)}</FeatureGroup></Map>);
    expect(wrapper.find(Polyline).props().color).toEqual(lineStringFeature2.properties.color);
    expect(wrapper.find(Polyline).props().weight).toEqual(lineStringFeature2.properties.weight);
    expect(wrapper.find(Polyline).props().opacity).toEqual(lineStringFeature2.properties.opacity);
    expect(wrapper.find(Polyline).props().radius).toEqual(undefined);
    expect(wrapper.find(Polyline).props().fillColor).toEqual(undefined);
    expect(wrapper.find(Polyline).props().fillOpacity).toEqual(undefined);
  });
  it('Zero value', () => {
    const wrapper = mount(<Map><FeatureGroup>{createLineStringComponent(lineStringFeature3)}</FeatureGroup></Map>);
    expect(wrapper.find(Polyline).props().weight).toEqual(0);
    expect(wrapper.find(Polyline).props().opacity).toEqual(0);
  });
});