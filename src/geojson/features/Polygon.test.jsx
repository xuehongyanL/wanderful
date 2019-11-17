import LineString from './LineString';
import Polygon from './Polygon';

describe('Polygon', () => {
  const testLatlngObjClockwise = [[
    {lat: 0, lng: 0},
    {lat: 1, lng: 0},
    {lat: 1, lng: 1},
    {lat: 0, lng: 1}
  ]];
  const testLatlngObjCounterClockwise = [[
    {lat: 0, lng: 0},
    {lat: 0, lng: 1},
    {lat: 1, lng: 1},
    {lat: 1, lng: 0}
  ]];
  const targetLnglatArr = [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]];
  it('No props', () => {
    expect(Polygon(testLatlngObjClockwise, {})).toEqual({
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'Polygon',
        'coordinates': targetLnglatArr
      }
    });
  });
  it('Extra props', () => {
    expect(Polygon(testLatlngObjClockwise, {
      'color': '#123456',
      'weight': 120,
      'radius': 666
    })).toEqual({
      'type': 'Feature',
      'properties': {'color': '#123456', 'weight': 120},
      'geometry': {
        'type': 'Polygon',
        'coordinates': targetLnglatArr
      }
    });
  });
  it('Rewind', () => {
    expect(
      Polygon(testLatlngObjClockwise, {})
    ).toEqual(
      Polygon(testLatlngObjCounterClockwise, {})
    );
  });
});