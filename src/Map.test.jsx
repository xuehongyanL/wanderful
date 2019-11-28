import React from 'react';
import _ from 'lodash';
import {mount, render} from 'enzyme';

import emitter from './ev';
import MapComponent from './Map';
import geojsonParse from './geojson/parser';
import {CircleMarker, Polygon, Polyline} from 'react-leaflet';
import mapConfig from './config/mapConfig';
import {pointFeature1} from '../__test__/data/features/Point';
import {lineStringFeature1} from '../__test__/data/features/LineString';
import {polygonFeature1} from '../__test__/data/features/Polygon';
import {noShift} from './config/shifts';

describe('MapComponent', () => {
  const parserMock = jest.fn((feature, shift) => {expect(shift(1, 2)).toEqual([1, 2]);});
  const testData = {
    'type': 'FeatureCollection',
    'features': [pointFeature1, lineStringFeature1, polygonFeature1]
  };
  const wrapper = mount(<MapComponent parser={parserMock} />);
  it('Mount', () => {
    wrapper.setState({jsonObj: testData}, () => {
      wrapper.update();
      expect(wrapper.state('jsonObj')).toEqual(testData);
      expect(parserMock.mock.calls.length).toEqual(3);
      expect(parserMock.mock.calls).toEqual(_.map(testData.features, (feature) => ([feature, noShift])));
    });
  });
  it('Json handler', () => {
    const jsonMock = jest.fn();
    emitter.on('json', jsonMock);
    emitter.emit('json', testData);
    expect(jsonMock.mock.calls.length).toEqual(1);
    expect(jsonMock.mock.calls[0][0]).toEqual(testData);
    expect(wrapper.state('jsonObj')).toEqual(testData);
  });
  it('Edit handler', () => {
    const editMock = jest.fn();
    emitter.on('editObj', editMock);
    wrapper.instance()._onEdited(233);
    expect(editMock.mock.calls.length).toEqual(1);
    expect(editMock.mock.calls[0][0]).toEqual(233);
  });
  it('Create handler', () => {
    const createMock = jest.fn();
    const layerMock = jest.fn();
    const createEvent = {layer: {_leaflet_id: 0}};
    wrapper.instance().refs = {edit: {leafletElement: {options: {edit: {featureGroup: {
      removeLayer: layerMock,
      _layers: [233]
    }}}}}};

    emitter.on('createObj', createMock);
    wrapper.instance()._onCreated(createEvent);
    expect(createMock.mock.calls.length).toEqual(1);
    expect(createMock.mock.calls[0][0]).toEqual(createEvent);
    expect(layerMock.mock.calls.length).toEqual(1);
    expect(layerMock.mock.calls[0][0]).toEqual(233);
  });
  it('Delete handler', () => {
    const deleteMock = jest.fn();
    emitter.on('deleteObj', deleteMock);
    wrapper.instance()._onDeleted(233);
    expect(deleteMock.mock.calls.length).toEqual(1);
    expect(deleteMock.mock.calls[0][0]).toEqual(233);
  });
  it('Change map config', () => {
    emitter.emit('map', 'GoogleMap');
    wrapper.update();
    expect(wrapper.state('mapConfig')).toEqual(mapConfig.GoogleMap);
    emitter.emit('map', 'GaodeMap');
    wrapper.update();
    expect(wrapper.state('mapConfig')).toEqual(mapConfig.GaodeMap);
  });
});