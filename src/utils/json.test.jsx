import _JSON from './json';
import {dummyData} from '../../__test__/data/dummy';

describe('Json', () => {
  it('Stringify custom', () => {
    expect(_JSON.stringify(dummyData)).toEqual(JSON.stringify(dummyData, null, 2));
  });
});