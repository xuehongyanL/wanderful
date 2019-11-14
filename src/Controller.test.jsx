import Control from './Controller';
import emitter from './ev';

describe('Controller', () => {
  let rightString = '{\n  "type": "FeatureCollection",\n  "features": [\n' +
    '    {\n      "type": "Feature",\n      "properties": {},\n' +
    '      "geometry": {\n        "type": "Point",\n        "coordinates": [\n' +
    '          -0.0710710816264304,\n          51.52881461212225\n        ]\n' +
    '      }\n    }\n  ]\n}';
  let rightObj = {
    'type': 'FeatureCollection',
    'features': [
      {
        'type': 'Feature',
        'properties': {},
        'geometry': {'type': 'Point', 'coordinates': [-0.0710710816264304, 51.52881461212225]}
      }
    ]
  };
  let wrongJsonString = '{\n  "type": "FeatureCollection",\n  "features": [\n' +
    '    {\n      "type": "Feature",\n      "properties": {},\n' +
    '      "geometry": {\n        "type": "Point",\n        "coordinates": [\n' +
    '          -0.0710710816264304,\n          51.52881461212225\n        ],\n' +
    '      }\n    }\n  ]\n}';
  let wrongGeoJsonString = '{\n  "type": "FeatureCollection",\n  "features": [\n' +
    '    {\n      "type": "Feature",\n      "properties": {},\n      "geometry": {\n' +
    '        "type": "Point",\n        "coordinates": [\n          [\n' +
    '            -0.08858027954243397,\n            51.51311182627799\n          ],\n' +
    '          [\n            -0.0786245053301804,\n            51.49964310276621\n' +
    '          ]\n        ]\n      }\n    }\n  ]\n}';
  it('Parse right data', (end) => {
    emitter.on('json', (data) => {
      expect(data).toEqual(rightObj);
      end();
    });
    expect(Control.updateJSON(rightString)).toEqual(null);
  });
  it('Parse wrong json data', () => {
    expect(Control.updateJSON(wrongJsonString)).toEqual(new SyntaxError('Unexpected token } in JSON at position 250'));
  });
  it('Parse right json but not right geojson data', () => {
    expect(Control.updateJSON(wrongGeoJsonString)).toEqual([{message: 'each element in a position must be a number'}]);
  });
});