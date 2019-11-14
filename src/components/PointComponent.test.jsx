import React from 'react';
import {mount} from 'enzyme';
import {FeatureGroup, Map, CircleMarker} from 'react-leaflet';

import createPointComponent from './PointComponent';
import {featureConfig} from '../config';

jest.mock('leaflet');

describe('PointComponent', () => {
  const testFeature1 = {'type': 'Feature', 'properties': {}, 'geometry': {'type': 'Point', 'coordinates': [-0.08356532689164366, 51.51300494732007]}};
  const testFeature2 = {'type': 'Feature', 'properties': {'color': '#123456', 'weight': 120, 'opacity': 0.233, 'radius': 20, 'fillColor': '#654321', 'fillOpacity': 0.05}, 'geometry': {'type': 'Point', 'coordinates': [-0.08356532689164366, 51.51300494732007]}};
  const testFeature3 = {'type': 'Feature', 'properties': {'color': '#123456', 'weight': 0, 'opacity': 0, 'radius': 0, 'fillColor': '#654321', 'fillOpacity': 0}, 'geometry': {'type': 'Point', 'coordinates': [-0.08356532689164366, 51.51300494732007]}};
  it('Generate default', () => {
    const wrapper = mount(<Map><FeatureGroup>{createPointComponent(testFeature1)}</FeatureGroup></Map>);
    expect(wrapper.find(CircleMarker).props().color).toEqual(featureConfig.default.color);
    expect(wrapper.find(CircleMarker).props().weight).toEqual(featureConfig.default.weight);
    expect(wrapper.find(CircleMarker).props().opacity).toEqual(featureConfig.default.opacity);
    expect(wrapper.find(CircleMarker).props().radius).toEqual(featureConfig.default.radius);
    expect(wrapper.find(CircleMarker).props().fillColor).toEqual(featureConfig.default.fillColor);
    expect(wrapper.find(CircleMarker).props().fillOpacity).toEqual(featureConfig.default.fillOpacity);
  });
  it('Generate custom', () => {
    const wrapper = mount(<Map><FeatureGroup>{createPointComponent(testFeature2)}</FeatureGroup></Map>);
    expect(wrapper.find(CircleMarker).props().color).toEqual(testFeature2.properties.color);
    expect(wrapper.find(CircleMarker).props().weight).toEqual(testFeature2.properties.weight);
    expect(wrapper.find(CircleMarker).props().opacity).toEqual(testFeature2.properties.opacity);
    expect(wrapper.find(CircleMarker).props().radius).toEqual(testFeature2.properties.radius);
    expect(wrapper.find(CircleMarker).props().fillColor).toEqual(testFeature2.properties.fillColor);
    expect(wrapper.find(CircleMarker).props().fillOpacity).toEqual(testFeature2.properties.fillOpacity);
  });
  it('Zero value', () => {
    const wrapper = mount(<Map><FeatureGroup>{createPointComponent(testFeature3)}</FeatureGroup></Map>);
    expect(wrapper.find(CircleMarker).props().weight).toEqual(0);
    expect(wrapper.find(CircleMarker).props().opacity).toEqual(0);
    expect(wrapper.find(CircleMarker).props().radius).toEqual(0);
    expect(wrapper.find(CircleMarker).props().fillOpacity).toEqual(0);
  });
});