import React from 'react';
import {mount} from 'enzyme';
import {FeatureGroup, Map, Polygon} from 'react-leaflet';

import createPolygonComponent from './PolygonComponent';
import {featureConfig} from '../config';

jest.mock('leaflet');

describe('PolygonComponent', () => {
  const testFeature1 = {'type': 'Feature', 'properties': {}, 'geometry': {'type': 'Polygon', 'coordinates': [[[-0.06896825433201804, 51.54100014336822], [-0.0793345225694231, 51.540922461726986], [-0.0639724731445246, 51.53004559761984], [-0.046612121726228306, 51.535018200536], [-0.07920962410914892, 51.53082260349719], [-0.06896825433201804, 51.54100014336822]]]}};
  const testFeature2 = {'type': 'Feature', 'properties': {'color': '#123456', 'weight': 120, 'opacity': 0.233, 'fillColor': '#654321', 'fillOpacity': 0.05}, 'geometry': {'type': 'Polygon', 'coordinates': [[[-0.06896825433201804, 51.54100014336822], [-0.0793345225694231, 51.540922461726986], [-0.0639724731445246, 51.53004559761984], [-0.046612121726228306, 51.535018200536], [-0.07920962410914892, 51.53082260349719], [-0.06896825433201804, 51.54100014336822]]]}};
  const testFeature3 = {'type': 'Feature', 'properties': {'color': '#123456', 'weight': 0, 'opacity': 0, 'fillColor': '#654321', 'fillOpacity': 0}, 'geometry': {'type': 'Polygon', 'coordinates': [[[-0.06896825433201804, 51.54100014336822], [-0.0793345225694231, 51.540922461726986], [-0.0639724731445246, 51.53004559761984], [-0.046612121726228306, 51.535018200536], [-0.07920962410914892, 51.53082260349719], [-0.06896825433201804, 51.54100014336822]]]}};
  it('Generate default', () => {
    const wrapper = mount(<Map><FeatureGroup>{createPolygonComponent(testFeature1)}</FeatureGroup></Map>);
    expect(wrapper.find(Polygon).props().color).toEqual(featureConfig.default.color);
    expect(wrapper.find(Polygon).props().weight).toEqual(featureConfig.default.weight);
    expect(wrapper.find(Polygon).props().opacity).toEqual(featureConfig.default.opacity);
    expect(wrapper.find(Polygon).props().fillColor).toEqual(featureConfig.default.fillColor);
    expect(wrapper.find(Polygon).props().fillOpacity).toEqual(featureConfig.default.fillOpacity);
    expect(wrapper.find(Polygon).props().radius).toEqual(undefined);
  });
  it('Generate custom', () => {
    const wrapper = mount(<Map><FeatureGroup>{createPolygonComponent(testFeature2)}</FeatureGroup></Map>);
    expect(wrapper.find(Polygon).props().color).toEqual(testFeature2.properties.color);
    expect(wrapper.find(Polygon).props().weight).toEqual(testFeature2.properties.weight);
    expect(wrapper.find(Polygon).props().opacity).toEqual(testFeature2.properties.opacity);
    expect(wrapper.find(Polygon).props().fillColor).toEqual(testFeature2.properties.fillColor);
    expect(wrapper.find(Polygon).props().fillOpacity).toEqual(testFeature2.properties.fillOpacity);
    expect(wrapper.find(Polygon).props().radius).toEqual(undefined);
  });
  it('Zero value', () => {
    const wrapper = mount(<Map><FeatureGroup>{createPolygonComponent(testFeature3)}</FeatureGroup></Map>);
    expect(wrapper.find(Polygon).props().weight).toEqual(0);
    expect(wrapper.find(Polygon).props().opacity).toEqual(0);
    expect(wrapper.find(Polygon).props().fillOpacity).toEqual(0);
  });
});