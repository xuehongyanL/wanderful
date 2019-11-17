import emitter from '../ev';
import _JSON from '../utils/json';
import handleDelete from './handleDelete';
import createEvent from '../utils/createEvent';
import {featureGroupObj} from '../../__test__/data/features/FeatureGroup';

describe('Delete handler', () => {
  const mockFunc = jest.fn();
  const mockSelf = {jsonObj: featureGroupObj};
  emitter.on('text', mockFunc);
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('Delete circlemarker', () => {
    let e = {...createEvent(featureGroupObj.features[0])};
    handleDelete(mockSelf, e);
    expect(mockFunc.mock.calls.length).toEqual(1);
    expect(mockFunc.mock.calls[0][0]).toEqual(_JSON.stringify({
      'type': 'FeatureCollection',
      'features': [featureGroupObj.features[1], featureGroupObj.features[2]]
    }));
  });
  it('Delete polyline', () => {
    let e = {...createEvent(featureGroupObj.features[1])};
    handleDelete(mockSelf, e);
    expect(mockFunc.mock.calls.length).toEqual(1);
    expect(mockFunc.mock.calls[0][0]).toEqual(_JSON.stringify({
      'type': 'FeatureCollection',
      'features': [featureGroupObj.features[0], featureGroupObj.features[2]]
    }));
  });
  it('Delete polygon', () => {
    let e = {...createEvent(featureGroupObj.features[2])};
    handleDelete(mockSelf, e);
    expect(mockFunc.mock.calls.length).toEqual(1);
    expect(mockFunc.mock.calls[0][0]).toEqual(_JSON.stringify({
      'type': 'FeatureCollection',
      'features': [featureGroupObj.features[0], featureGroupObj.features[1]]
    }));
  });
  it('Delete rectangle', () => {
    let e = {...createEvent(featureGroupObj.features[2])};
    handleDelete(mockSelf, e);
    expect(mockFunc.mock.calls.length).toEqual(1);
    expect(mockFunc.mock.calls[0][0]).toEqual(_JSON.stringify({
      'type': 'FeatureCollection',
      'features': [featureGroupObj.features[0], featureGroupObj.features[1]]
    }));
  });
});