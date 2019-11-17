import FeatureCollection from './FeatureCollection';
import {dummyData} from '../../../__test__/data/dummy';

describe('Feature collection', () => {
  it('Any feature', () => {
    expect(FeatureCollection(dummyData)).toEqual({
      'type': 'FeatureCollection',
      'features': dummyData
    });
  });
});