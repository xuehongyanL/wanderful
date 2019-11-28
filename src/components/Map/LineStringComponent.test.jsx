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
import {noShift, wgs84togcj02} from '../../config/shifts';
import coordTransform from '../../utils/coordTransform';

jest.mock('leaflet');

describe('LineStringComponent', () => {
  it('Generate default', () => {
    const wrapper = mount(<Map><FeatureGroup>{createLineStringComponent(lineStringFeature1, noShift)}</FeatureGroup></Map>);
    expect(wrapper.find(Polyline).props().color).toEqual(featureConfig.default.color);
    expect(wrapper.find(Polyline).props().weight).toEqual(featureConfig.default.weight);
    expect(wrapper.find(Polyline).props().opacity).toEqual(featureConfig.default.opacity);
    expect(wrapper.find(Polyline).props().radius).toEqual(undefined);
    expect(wrapper.find(Polyline).props().fillColor).toEqual(undefined);
    expect(wrapper.find(Polyline).props().fillOpacity).toEqual(undefined);
  });
  it('Generate custom', () => {
    const wrapper = mount(<Map><FeatureGroup>{createLineStringComponent(lineStringFeature2, noShift)}</FeatureGroup></Map>);
    expect(wrapper.find(Polyline).props().color).toEqual(lineStringFeature2.properties.color);
    expect(wrapper.find(Polyline).props().weight).toEqual(lineStringFeature2.properties.weight);
    expect(wrapper.find(Polyline).props().opacity).toEqual(lineStringFeature2.properties.opacity);
    expect(wrapper.find(Polyline).props().radius).toEqual(undefined);
    expect(wrapper.find(Polyline).props().fillColor).toEqual(undefined);
    expect(wrapper.find(Polyline).props().fillOpacity).toEqual(undefined);
  });
  it('Zero value', () => {
    const wrapper = mount(<Map><FeatureGroup>{createLineStringComponent(lineStringFeature3, noShift)}</FeatureGroup></Map>);
    expect(wrapper.find(Polyline).props().weight).toEqual(0);
    expect(wrapper.find(Polyline).props().opacity).toEqual(0);
  });
  it('With shift', () => {
    const wrapper = mount(<Map><FeatureGroup>{createLineStringComponent(lineStringFeature1, wgs84togcj02)}</FeatureGroup></Map>);
    expect(wrapper.find(Polyline).props().positions).toEqual(coordTransform(lineStringFeature1.geometry.coordinates, 'lnglatArr', 'latlngArr', wgs84togcj02));
    expect(wrapper.find(Polyline).props().positions).not.toEqual(coordTransform(lineStringFeature1.geometry.coordinates, 'lnglatArr', 'latlngArr', noShift));
  });
});