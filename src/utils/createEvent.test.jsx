import createEvent from './createEvent';
import coordTransform from './coordTransform';
import {lineStringFeature3 as lineStringFeature} from '../../__test__/data/features/LineString';
import {pointFeature3 as pointFeature} from '../../__test__/data/features/Point';
import {polygonFeature3 as polygonFeature} from '../../__test__/data/features/Polygon';

describe('Create event', () => {
  it('Linestring event', () => {
    const targetLineStringEvent = {layers: {_layers: {0: {
      options: {
        positions: [
          [51.51921322437121, -0.08867390513199515],
          [51.50630993620114, -0.07344375666854974],
          [51.519368666516044, -0.059711654306831015],
          [51.50615445438362, -0.06120970040855768],
          [51.51120740059332, -0.08717585379189874]
        ],
        properties: {'color': '#123456', 'weight': 0, 'opacity': 0}
      },
      _latlngs: [
        {lng: -0.08867390513199515,  lat: 51.51921322437121},
        {lng: -0.07344375666854974,  lat: 51.50630993620114},
        {lng: -0.059711654306831015, lat: 51.519368666516044},
        {lng: -0.06120970040855768,  lat: 51.50615445438362},
        {lng: -0.08717585379189874,  lat: 51.51120740059332}
      ]
    }}}};
    expect(createEvent(lineStringFeature)).toEqual(targetLineStringEvent);
  });
  it('Point event', () => {
    const targetPointEvent = {layers: {_layers: {0: {
      options: {
        center: [51.51300494732007, -0.08356532689164366],
        properties: {'color': '#123456', 'weight': 0, 'opacity': 0, 'radius': 0, 'fillColor': '#654321', 'fillOpacity': 0}
      },
      _latlng: {lng: -0.08356532689164366, lat: 51.51300494732007}
    }}}};
    expect(createEvent(pointFeature)).toEqual(targetPointEvent);
  });
  it('Polygon event', () => {
    const targetPolygonEvent = {layers: {_layers: {0: {
      options: {
        positions: [[51.5, -0.1], [51.5, 0], [51.6, 0], [51.6, -0.1]],
        properties: {'color': '#123456', 'weight': 0, 'opacity': 0, 'fillColor': '#654321', 'fillOpacity': 0}
      },
      _latlngs: [[{lng: -0.1, lat: 51.5}, {lng: 0, lat: 51.5}, {lng: 0, lat: 51.6}, {lng: -0.1, lat: 51.6}]]
    }}}};
    expect(createEvent(polygonFeature)).toEqual(targetPolygonEvent);
  });
});