import _ from 'lodash';

import emitter from '../ev';
import _JSON from '../utils/json';
import handleEdit from './handleEdit';
import createEvent from '../utils/createEvent';
import {featureGroupObj} from '../../__test__/data/features/FeatureGroup';
import {noShift, gcj02towgs84, wgs84togcj02} from '../config/shifts';

describe('Edit handler', () => {
  const mockFunc = jest.fn();
  const mockSelf = {jsonObj: featureGroupObj};
  emitter.on('text', mockFunc);
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('Edit circlemarker', () => {
    let e = _.cloneDeep({...createEvent(featureGroupObj.features[0])});
    e.layers._layers[0].options.properties['color'] = '#233333';
    handleEdit(mockSelf, e, noShift, noShift);
    expect(mockFunc.mock.calls.length).toEqual(1);
    expect(mockFunc.mock.calls[0][0]).toEqual(_JSON.stringify({
      'type': 'FeatureCollection',
      'features': [
        {...featureGroupObj.features[0], properties: {...featureGroupObj.features[0].properties, color: '#233333'}},
        featureGroupObj.features[1], featureGroupObj.features[2]
      ]
    }));
  });
  it('Edit polyline', () => {
    let e = _.cloneDeep({...createEvent(featureGroupObj.features[1])});
    e.layers._layers[0].options.properties['color'] = '#233333';
    handleEdit(mockSelf, e, noShift, noShift);
    expect(mockFunc.mock.calls.length).toEqual(1);
    expect(mockFunc.mock.calls[0][0]).toEqual(_JSON.stringify({
      'type': 'FeatureCollection',
      'features': [
        featureGroupObj.features[0],
        {...featureGroupObj.features[1], properties: {...featureGroupObj.features[1].properties, color: '#233333'}},
        featureGroupObj.features[2]
      ]
    }));
  });
  it('Edit polygon', () => {
    let e = _.cloneDeep({...createEvent(featureGroupObj.features[2])});
    e.layers._layers[0].options.properties['color'] = '#233333';
    handleEdit(mockSelf, e, noShift, noShift);
    expect(mockFunc.mock.calls.length).toEqual(1);
    expect(mockFunc.mock.calls[0][0]).toEqual(_JSON.stringify({
      'type': 'FeatureCollection',
      'features': [
        featureGroupObj.features[0], featureGroupObj.features[1],
        {...featureGroupObj.features[2], properties: {...featureGroupObj.features[2].properties, color: '#233333'}},
      ]
    }));
  });
  it('Edit rectangle', () => {
    let e = _.cloneDeep({...createEvent(featureGroupObj.features[2])});
    e.layers._layers[0].options.properties['color'] = '#233333';
    handleEdit(mockSelf, e, noShift, noShift);
    expect(mockFunc.mock.calls.length).toEqual(1);
    expect(mockFunc.mock.calls[0][0]).toEqual(_JSON.stringify({
      'type': 'FeatureCollection',
      'features': [
        featureGroupObj.features[0], featureGroupObj.features[1],
        {...featureGroupObj.features[2], properties: {...featureGroupObj.features[2].properties, color: '#233333'}},
      ]
    }));
  });
  it('Ignore invalid props', () => {
    let e = _.cloneDeep({...createEvent(featureGroupObj.features[2])});
    e.layers._layers[0].options.properties['colour'] = '#233333';
    handleEdit(mockSelf, e, noShift, noShift);
    expect(mockFunc.mock.calls.length).toEqual(1);
    expect(mockFunc.mock.calls[0][0]).toEqual(_JSON.stringify({
      'type': 'FeatureCollection',
      'features': [
        featureGroupObj.features[0],
        featureGroupObj.features[1],
        featureGroupObj.features[2]
      ]
    }));
  });
  it('With shift', () => {
    let e = {...createEvent(featureGroupObj.features[2])};
    handleEdit(mockSelf, e, noShift, gcj02towgs84);
    expect(mockFunc.mock.calls[0][0]).toEqual(_JSON.stringify({
      'type': 'FeatureCollection',
      'features': [
        featureGroupObj.features[0],
        featureGroupObj.features[1],
        {
          type: 'Feature', properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: [[[-0.1, 51.5], [0, 51.5], [116.38499169642985, 39.905371277860965], [-0.1, 51.6], [-0.1, 51.5]]]
          }
        }
      ]
    }));
  });
});