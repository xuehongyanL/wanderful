import React from 'react';
import {mount} from 'enzyme';

import emitter from '../../src/ev';
import Bench from '../Bench';
import * as types from '../types';

jest.mock('leaflet');

describe('Initialization', () => {
  //const wrapper = mount(<Bench />);
  it('Mount', () => {
    // expect(wrapper.find(types.MapComponent)).toHaveLength(1);
    // expect(wrapper.find(types.Editor)).toHaveLength(1);
    // expect(wrapper.find(types.AceEditor)).toHaveLength(1);
    // expect(wrapper.find(types.Map)).toHaveLength(1);
    // expect(wrapper.find(types.FeatureGroup)).toHaveLength(1);
    // expect(wrapper.find(types.ZoomControl)).toHaveLength(1);
    // expect(wrapper.find(types.TileLayer)).toHaveLength(1);
    // expect(wrapper.find(types.CircleMarker)).toHaveLength(0);
    // expect(wrapper.find(types.Polyline)).toHaveLength(0);
    // expect(wrapper.find(types.Polygon)).toHaveLength(0);
  });
});