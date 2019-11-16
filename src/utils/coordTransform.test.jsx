import coordTransform from './coordTransform';

describe('Coordinate transform', () => {
  const singleLatlngObj = {lat: 56, lng: 65};
  const singleLatlngArr = [56, 65];
  const singleLnglatArr = [65, 56];
  const complexLatlngObj = [[{lat: 1, lng: 2}, {lat: 3, lng: 4}, {lat: 5, lng: 6}, {lat: 7, lng: 8}]];
  const complexLatlngArr = [[[1, 2], [3, 4], [5, 6], [7, 8]]];
  const complexLnglatArr = [[[2, 1], [4, 3], [6, 5], [8, 7]]];
  it('Simple transform', () => {
    expect(coordTransform(singleLatlngObj, 'latlngObj', 'latlngArr')).toEqual(singleLatlngArr);
    expect(coordTransform(singleLatlngObj, 'latlngObj', 'lnglatArr')).toEqual(singleLnglatArr);
    expect(coordTransform(singleLatlngArr, 'latlngArr', 'latlngObj')).toEqual(singleLatlngObj);
    expect(coordTransform(singleLatlngArr, 'latlngArr', 'lnglatArr')).toEqual(singleLnglatArr);
    expect(coordTransform(singleLnglatArr, 'lnglatArr', 'latlngObj')).toEqual(singleLatlngObj);
    expect(coordTransform(singleLnglatArr, 'lnglatArr', 'latlngArr')).toEqual(singleLatlngArr);
  });
  it('Complex transform', () => {
    expect(coordTransform(complexLatlngObj, 'latlngObj', 'latlngArr')).toEqual(complexLatlngArr);
    expect(coordTransform(complexLatlngObj, 'latlngObj', 'lnglatArr')).toEqual(complexLnglatArr);
    expect(coordTransform(complexLatlngArr, 'latlngArr', 'latlngObj')).toEqual(complexLatlngObj);
    expect(coordTransform(complexLatlngArr, 'latlngArr', 'lnglatArr')).toEqual(complexLnglatArr);
    expect(coordTransform(complexLnglatArr, 'lnglatArr', 'latlngObj')).toEqual(complexLatlngObj);
    expect(coordTransform(complexLnglatArr, 'lnglatArr', 'latlngArr')).toEqual(complexLatlngArr);
  });
});