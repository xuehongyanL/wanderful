import LineString from './LineString';

describe('Line string', () => {
  const testLatlngObj = [
    {lat: 1, lng: 2},
    {lat: 3, lng: 4},
    {lat: 5, lng: 6},
    {lat: 7, lng: 8}
  ];
  const targetLnglatArr = [[2, 1], [4, 3], [6, 5], [8, 7]];
  it('No props', () => {
    expect(LineString(testLatlngObj, {})).toEqual({
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'LineString',
        'coordinates': targetLnglatArr
      }
    });
  });
  it('Extra props', () => {
    expect(LineString(testLatlngObj, {
      'color': '#123456',
      'weight': 120,
      'fillColor': '#234567'
    })).toEqual({
      'type': 'Feature',
      'properties': {'color': '#123456', 'weight': 120},
      'geometry': {
        'type': 'LineString',
        'coordinates': targetLnglatArr
      }
    });
  });
});