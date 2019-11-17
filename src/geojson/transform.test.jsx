import _ from 'lodash';

import geojsonTransform from './transform';
import _JSON from '../utils/json';
import {pointFeature1, pointFeature2} from '../../__test__/data/features/Point';

function stringify(obj){
  return _JSON.stringify(obj).replace(/\r?\n|\r/g, '');
}

describe('Geojson transformer', () => {
  it('Single feature', () => {
    let str1 = geojsonTransform(stringify(pointFeature1));
    let str2 = _JSON.stringify({
      'type': 'FeatureCollection',
      'features': [pointFeature1],
    });
    expect(str1).toEqual(str2);
  });
  it('Parse error', () => {
    expect(geojsonTransform('233333' + stringify(pointFeature1))).toEqual(
      '233333' + stringify(pointFeature1)
    );
  });
  it('Geometry collection', () => {
    let str1 = geojsonTransform(stringify({
      'type': 'GeometryCollection',
      'geometries': [
        {'type': 'Point', 'coordinates': [1, 2]},
        {'type': 'LineString', 'coordinates': [[3, 4], [5, 6], [7, 8]]}
      ]
    }));
    let str2 = _JSON.stringify({
      'type': 'FeatureCollection',
      'features': [
        {'type': 'Feature', 'properties': {}, 'geometry': {'type': 'Point', 'coordinates': [1, 2]}},
        {'type': 'Feature', 'properties': {}, 'geometry': {'type': 'LineString', 'coordinates': [[3, 4], [5, 6], [7, 8]]}}
      ]
    });
    expect(str1).toEqual(str2);
  });
  it('Multi point', () => {
    let str1 = geojsonTransform(stringify({
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'MultiPoint',
        'coordinates': [[1, 2], [3, 4]]
      }
    }));
    let str2 = _JSON.stringify({
      'type': 'FeatureCollection',
      'features': [
        {'type': 'Feature', 'properties': {}, 'geometry': {'type': 'Point', 'coordinates': [1, 2]}},
        {'type': 'Feature', 'properties': {}, 'geometry': {'type': 'Point', 'coordinates': [3, 4]}}
      ]
    });
    expect(str1).toEqual(str2);
  });
  it('Multi linestring', () => {
    let str1 = geojsonTransform(stringify({
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'MultiLineString',
        'coordinates': [[[1, 2], [3, 4], [5, 6]], [[7, 8], [9, 0]]]
      }
    }));
    let str2 = _JSON.stringify({
      'type': 'FeatureCollection',
      'features': [
        {'type': 'Feature', 'properties': {}, 'geometry': {'type': 'LineString', 'coordinates': [[1, 2], [3, 4], [5, 6]]}},
        {'type': 'Feature', 'properties': {}, 'geometry': {'type': 'LineString', 'coordinates': [[7, 8], [9, 0]]}}
      ]
    });
    expect(str1).toEqual(str2);
  });
  it('Multi polygon', () => {
    let str1 = geojsonTransform(stringify({
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'MultiPolygon',
        'coordinates': [[[[1, 2], [3, 4], [6, 5], [1, 2]]], [[[-1, -2], [-3, -4], [-6, -5], [-1, -2]]]]
      }
    }));
    let str2 = _JSON.stringify({
      'type': 'FeatureCollection',
      'features': [
        {'type': 'Feature', 'properties': {}, 'geometry': {'type': 'Polygon', 'coordinates': [[[1, 2], [6, 5], [3, 4],  [1, 2]]]}},
        {'type': 'Feature', 'properties': {}, 'geometry': {'type': 'Polygon', 'coordinates': [[[-1, -2],  [-6, -5], [-3, -4], [-1, -2]]]}}
      ]
    });
    expect(str1).toEqual(str2);
  });
  it('Filter useless props', () => {
    let pointFeatureCustom = _.cloneDeep(pointFeature2);
    pointFeatureCustom.properties['colour'] = '#233333';
    let str1 = geojsonTransform(stringify(pointFeatureCustom));
    let str2 = _JSON.stringify({
      'type': 'FeatureCollection',
      'features': [pointFeature2],
    });
    expect(str1).toEqual(str2);
  });
});