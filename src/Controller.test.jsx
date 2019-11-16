import emitter from './ev';
import Control from './Controller';
import {handleCreate, handleDelete, handleEdit} from './handlers';

jest.mock('./handlers');

describe('Controller', () => {
  let correctString = '{\n  "type": "FeatureCollection",\n  "features": [\n' +
    '    {\n      "type": "Feature",\n      "properties": {},\n' +
    '      "geometry": {\n        "type": "Point",\n        "coordinates": [\n' +
    '          -0.0710710816264304,\n          51.52881461212225\n        ]\n' +
    '      }\n    }\n  ]\n}';
  let correctObj = {
    'type': 'FeatureCollection',
    'features': [
      {
        'type': 'Feature',
        'properties': {},
        'geometry': {'type': 'Point', 'coordinates': [-0.0710710816264304, 51.52881461212225]}
      }
    ]
  };
  let incorrectJsonString = '{\n  "type": "FeatureCollection",\n  "features": [\n' +
    '    {\n      "type": "Feature",\n      "properties": {},\n' +
    '      "geometry": {\n        "type": "Point",\n        "coordinates": [\n' +
    '          -0.0710710816264304,\n          51.52881461212225\n        ],\n' +
    '      }\n    }\n  ]\n}';
  let incorrectGeoJsonString = '{\n  "type": "FeatureCollection",\n  "features": [\n' +
    '    {\n      "type": "Feature",\n      "properties": {},\n      "geometry": {\n' +
    '        "type": "Point",\n        "coordinates": [\n          [\n' +
    '            -0.08858027954243397,\n            51.51311182627799\n          ],\n' +
    '          [\n            -0.0786245053301804,\n            51.49964310276621\n' +
    '          ]\n        ]\n      }\n    }\n  ]\n}';
  it('Parse correct data', (end) => {
    emitter.on('json', (data) => {
      expect(data).toEqual(correctObj);
      end();
    });
    expect(Control.updateJSON(correctString)).toEqual(null);
  });
  it('Parse incorrect json data', () => {
    expect(Control.updateJSON(incorrectJsonString)).toEqual(new SyntaxError('Unexpected token } in JSON at position 250'));
  });
  it('Parse correct json but incorrect geojson data', () => {
    expect(Control.updateJSON(incorrectGeoJsonString)).toEqual([{message: 'each element in a position must be a number'}]);
  });
  it('Call handlers', () => {
    emitter.emit('createObj', 1);
    emitter.emit('deleteObj', 2);
    emitter.emit('editObj', 3);
    expect(handleCreate.mock.calls.length).toEqual(1);
    expect(handleCreate.mock.calls[0][1]).toEqual(1);
    expect(handleDelete.mock.calls.length).toEqual(1);
    expect(handleDelete.mock.calls[0][1]).toEqual(2);
    expect(handleEdit.mock.calls.length).toEqual(1);
    expect(handleEdit.mock.calls[0][1]).toEqual(3);
  });
});