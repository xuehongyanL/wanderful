import React from 'react';
import {mount} from 'enzyme';
import {FeatureGroup, Map, Polygon} from 'react-leaflet';

import createPolygonComponent from './PolygonComponent';
import {featureConfig} from '../config';
import {
  polygonFeature1,
  polygonFeature2,
  polygonFeature3
} from '../../__test__/data/features/Polygon';

jest.mock('leaflet');

describe('PolygonComponent', () => {
  it('Generate default', () => {
    const wrapper = mount(<Map><FeatureGroup>{createPolygonComponent(polygonFeature1)}</FeatureGroup></Map>);
    expect(wrapper.find(Polygon).props().color).toEqual(featureConfig.default.color);
    expect(wrapper.find(Polygon).props().weight).toEqual(featureConfig.default.weight);
    expect(wrapper.find(Polygon).props().opacity).toEqual(featureConfig.default.opacity);
    expect(wrapper.find(Polygon).props().fillColor).toEqual(featureConfig.default.fillColor);
    expect(wrapper.find(Polygon).props().fillOpacity).toEqual(featureConfig.default.fillOpacity);
    expect(wrapper.find(Polygon).props().radius).toEqual(undefined);
  });
  it('Generate custom', () => {
    const wrapper = mount(<Map><FeatureGroup>{createPolygonComponent(polygonFeature2)}</FeatureGroup></Map>);
    expect(wrapper.find(Polygon).props().color).toEqual(polygonFeature2.properties.color);
    expect(wrapper.find(Polygon).props().weight).toEqual(polygonFeature2.properties.weight);
    expect(wrapper.find(Polygon).props().opacity).toEqual(polygonFeature2.properties.opacity);
    expect(wrapper.find(Polygon).props().fillColor).toEqual(polygonFeature2.properties.fillColor);
    expect(wrapper.find(Polygon).props().fillOpacity).toEqual(polygonFeature2.properties.fillOpacity);
    expect(wrapper.find(Polygon).props().radius).toEqual(undefined);
  });
  it('Zero value', () => {
    const wrapper = mount(<Map><FeatureGroup>{createPolygonComponent(polygonFeature3)}</FeatureGroup></Map>);
    expect(wrapper.find(Polygon).props().weight).toEqual(0);
    expect(wrapper.find(Polygon).props().opacity).toEqual(0);
    expect(wrapper.find(Polygon).props().fillOpacity).toEqual(0);
  });
});