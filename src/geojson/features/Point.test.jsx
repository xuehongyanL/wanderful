import Point from './Point';

describe('Point', () => {
  const testLatlngObj = {lat: 1, lng: 2};
  const targetLnglatArr = [2, 1];
  it('No props', () => {
    expect(Point(testLatlngObj, {})).toEqual({
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'Point',
        'coordinates': targetLnglatArr
      }
    });
  });
  it('Extra props', () => {
    expect(Point(testLatlngObj, {
      'color': '#123456',
      'weight': 120,
      'colour': 0.233
    })).toEqual({
      'type': 'Feature',
      'properties': {'color': '#123456', 'weight': 120},
      'geometry': {
        'type': 'Point',
        'coordinates': targetLnglatArr
      }
    });
  });
});