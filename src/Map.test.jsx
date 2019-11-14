import React from 'react';
import _ from 'lodash';
import {mount, render} from 'enzyme';

import emitter from './ev';
import MapComponent from './Map';
import geojsonParse from './geojson/parser';
import {CircleMarker, Polygon, Polyline} from 'react-leaflet';

describe('MapComponent', () => {
  const mockFunc = jest.fn();
  const testData = {
    'type': 'FeatureCollection',
    'features': [
      {'type': 'Feature', 'properties': {}, 'geometry': {'type': 'Point', 'coordinates': [-0.08102762324348368, 51.5161043352918]}},
      {'type': 'Feature', 'properties': {}, 'geometry': {'type': 'Polygon', 'coordinates': [[[-0.09134231525020242, 51.51936675077064], [-0.10282734584014631, 51.5059193127204], [-0.07973244355632404, 51.50576382630776], [-0.09134231525020242, 51.51936675077064]]]}},
      {'type': 'Feature', 'properties': {}, 'geometry': {'type': 'LineString', 'coordinates': [[-0.06999513603756613, 51.51998849939546], [-0.06787290013133607, 51.507551870078636]]}}]
  };
  const wrapper = mount(<MapComponent parser={mockFunc} />);
  it('Mount', () => {
    wrapper.setState({jsonObj: testData}, () => {
      wrapper.update();
      expect(wrapper.state('jsonObj')).toEqual(testData);
      expect(mockFunc.mock.calls.length).toEqual(3);
      expect(mockFunc.mock.calls).toEqual(_.map(testData.features, (feature) => ([feature])));
    });
  });
});