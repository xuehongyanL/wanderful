import React from 'react';
import {mount} from 'enzyme';
import {FeatureGroup, Map, Polyline} from 'react-leaflet';

import createLineStringComponent from './LineStringComponent';
import {featureConfig} from '../config';

jest.mock('leaflet');

describe('LineStringComponent', () => {
  const testFeature1 = {'type': 'Feature', 'properties': {}, 'geometry': {'type': 'LineString', 'coordinates': [[-0.08867390513199515, 51.51921322437121], [-0.07344375666854974, 51.50630993620114], [-0.059711654306831015, 51.519368666516044], [-0.06120970040855768, 51.50615445438362], [-0.08717585379189874, 51.51120740059332]]}};
  const testFeature2 = {'type': 'Feature', 'properties': {'color': '#123456', 'weight': 120, 'opacity': 0.233}, 'geometry': {'type': 'LineString', 'coordinates': [[-0.08867390513199515, 51.51921322437121], [-0.07344375666854974, 51.50630993620114], [-0.059711654306831015, 51.519368666516044], [-0.06120970040855768, 51.50615445438362], [-0.08717585379189874, 51.51120740059332]]}};
  const testFeature3 = {'type': 'Feature', 'properties': {'color': '#123456', 'weight': 0, 'opacity': 0}, 'geometry': {'type': 'LineString', 'coordinates': [[-0.08867390513199515, 51.51921322437121], [-0.07344375666854974, 51.50630993620114], [-0.059711654306831015, 51.519368666516044], [-0.06120970040855768, 51.50615445438362], [-0.08717585379189874, 51.51120740059332]]}};
  it('Generate default', () => {
    const wrapper = mount(<Map><FeatureGroup>{createLineStringComponent(testFeature1)}</FeatureGroup></Map>);
    expect(wrapper.find(Polyline).props().color).toEqual(featureConfig.default.color);
    expect(wrapper.find(Polyline).props().weight).toEqual(featureConfig.default.weight);
    expect(wrapper.find(Polyline).props().opacity).toEqual(featureConfig.default.opacity);
    expect(wrapper.find(Polyline).props().radius).toEqual(undefined);
    expect(wrapper.find(Polyline).props().fillColor).toEqual(undefined);
    expect(wrapper.find(Polyline).props().fillOpacity).toEqual(undefined);
  });
  it('Generate custom', () => {
    const wrapper = mount(<Map><FeatureGroup>{createLineStringComponent(testFeature2)}</FeatureGroup></Map>);
    expect(wrapper.find(Polyline).props().color).toEqual(testFeature2.properties.color);
    expect(wrapper.find(Polyline).props().weight).toEqual(testFeature2.properties.weight);
    expect(wrapper.find(Polyline).props().opacity).toEqual(testFeature2.properties.opacity);
    expect(wrapper.find(Polyline).props().radius).toEqual(undefined);
    expect(wrapper.find(Polyline).props().fillColor).toEqual(undefined);
    expect(wrapper.find(Polyline).props().fillOpacity).toEqual(undefined);
  });
  it('Zero value', () => {
    const wrapper = mount(<Map><FeatureGroup>{createLineStringComponent(testFeature3)}</FeatureGroup></Map>);
    expect(wrapper.find(Polyline).props().weight).toEqual(0);
    expect(wrapper.find(Polyline).props().opacity).toEqual(0);
  });
});