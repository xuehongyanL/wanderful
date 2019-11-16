import React from 'react';
import {mount} from 'enzyme';
import {FeatureGroup, Map, CircleMarker} from 'react-leaflet';

import createPointComponent from './PointComponent';
import {featureConfig} from '../config';
import {
  pointFeature1,
  pointFeature2,
  pointFeature3
} from '../../__test__/data/features/Point';

jest.mock('leaflet');

describe('PointComponent', () => {
  it('Generate default', () => {
    const wrapper = mount(<Map><FeatureGroup>{createPointComponent(pointFeature1)}</FeatureGroup></Map>);
    expect(wrapper.find(CircleMarker).props().color).toEqual(featureConfig.default.color);
    expect(wrapper.find(CircleMarker).props().weight).toEqual(featureConfig.default.weight);
    expect(wrapper.find(CircleMarker).props().opacity).toEqual(featureConfig.default.opacity);
    expect(wrapper.find(CircleMarker).props().radius).toEqual(featureConfig.default.radius);
    expect(wrapper.find(CircleMarker).props().fillColor).toEqual(featureConfig.default.fillColor);
    expect(wrapper.find(CircleMarker).props().fillOpacity).toEqual(featureConfig.default.fillOpacity);
  });
  it('Generate custom', () => {
    const wrapper = mount(<Map><FeatureGroup>{createPointComponent(pointFeature2)}</FeatureGroup></Map>);
    expect(wrapper.find(CircleMarker).props().color).toEqual(pointFeature2.properties.color);
    expect(wrapper.find(CircleMarker).props().weight).toEqual(pointFeature2.properties.weight);
    expect(wrapper.find(CircleMarker).props().opacity).toEqual(pointFeature2.properties.opacity);
    expect(wrapper.find(CircleMarker).props().radius).toEqual(pointFeature2.properties.radius);
    expect(wrapper.find(CircleMarker).props().fillColor).toEqual(pointFeature2.properties.fillColor);
    expect(wrapper.find(CircleMarker).props().fillOpacity).toEqual(pointFeature2.properties.fillOpacity);
  });
  it('Zero value', () => {
    const wrapper = mount(<Map><FeatureGroup>{createPointComponent(pointFeature3)}</FeatureGroup></Map>);
    expect(wrapper.find(CircleMarker).props().weight).toEqual(0);
    expect(wrapper.find(CircleMarker).props().opacity).toEqual(0);
    expect(wrapper.find(CircleMarker).props().radius).toEqual(0);
    expect(wrapper.find(CircleMarker).props().fillOpacity).toEqual(0);
  });
});