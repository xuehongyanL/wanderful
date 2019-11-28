import emitter from '../ev';
import _JSON from '../utils/json';
import handleCreate from './handleCreate';
import createEvent from '../utils/createEvent';
import {featureGroupObj} from '../../__test__/data/features/FeatureGroup';
import {noShift, gcj02towgs84} from '../config/shifts';

describe('Create handler', () => {
  const mockFunc = jest.fn();
  const mockSelf = {jsonObj: featureGroupObj};
  emitter.on('text', mockFunc);
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('Create circlemarker', () => {
    let e = {...createEvent(featureGroupObj.features[0]), layerType: 'circlemarker'};
    e.layer = e.layers._layers[0];
    handleCreate(mockSelf, e, noShift);
    expect(mockFunc.mock.calls.length).toEqual(1);
    expect(mockFunc.mock.calls[0][0]).toEqual(_JSON.stringify({
      'type': 'FeatureCollection',
      'features': [
        featureGroupObj.features[0], featureGroupObj.features[1],
        featureGroupObj.features[2], {...featureGroupObj.features[0], properties: {}}
      ]
    }));
  });
  it('Create polyline', () => {
    let e = {...createEvent(featureGroupObj.features[1]), layerType: 'polyline'};
    e.layer = e.layers._layers[0];
    handleCreate(mockSelf, e, noShift);
    expect(mockFunc.mock.calls.length).toEqual(1);
    expect(mockFunc.mock.calls[0][0]).toEqual(_JSON.stringify({
      'type': 'FeatureCollection',
      'features': [
        featureGroupObj.features[0], featureGroupObj.features[1],
        featureGroupObj.features[2], {...featureGroupObj.features[1], properties: {}}
      ]
    }));
  });
  it('Create polygon', () => {
    let e = {...createEvent(featureGroupObj.features[2]), layerType: 'polygon'};
    e.layer = e.layers._layers[0];
    handleCreate(mockSelf, e, noShift);
    expect(mockFunc.mock.calls.length).toEqual(1);
    expect(mockFunc.mock.calls[0][0]).toEqual(_JSON.stringify({
      'type': 'FeatureCollection',
      'features': [
        featureGroupObj.features[0], featureGroupObj.features[1],
        featureGroupObj.features[2], {...featureGroupObj.features[2], properties: {}}
      ]
    }));
  });
  it('Create rectangle', () => {
    let e = {...createEvent(featureGroupObj.features[2]), layerType: 'rectangle'};
    e.layer = e.layers._layers[0];
    handleCreate(mockSelf, e, noShift);
    expect(mockFunc.mock.calls.length).toEqual(1);
    expect(mockFunc.mock.calls[0][0]).toEqual(_JSON.stringify({
      'type': 'FeatureCollection',
      'features': [
        featureGroupObj.features[0], featureGroupObj.features[1],
        featureGroupObj.features[2], {...featureGroupObj.features[2], properties: {}}
      ]
    }));
  });
  it('With shift', () => {
    let e = {...createEvent(featureGroupObj.features[0]), layerType: 'circlemarker'};
    e.layer = e.layers._layers[0];
    handleCreate(mockSelf, e, gcj02towgs84);
    expect(mockFunc.mock.calls.length).toEqual(1);
    expect(mockFunc.mock.calls[0][0]).toEqual(_JSON.stringify({
      'type': 'FeatureCollection',
      'features': [
        featureGroupObj.features[0], featureGroupObj.features[1],
        featureGroupObj.features[2], {...featureGroupObj.features[0], properties: {}, geometry: {type: 'Point', coordinates: [116.38499169642985, 39.905371277860965]}}
      ]
    }));
  });
});