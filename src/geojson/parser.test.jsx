import geojsonParse from './parser';
import {
  createLineStringComponent,
  createPointComponent,
  createPolygonComponent
} from '../components/Map';

jest.mock('../components');

describe('Geojson parser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('Parse LineString', () => {
    geojsonParse({geometry: {type: 'LineString'}});
    expect(createLineStringComponent.mock.calls.length).toEqual(1);
    expect(createLineStringComponent.mock.calls[0][0]).toEqual({geometry: {type: 'LineString'}});
    expect(createPointComponent.mock.calls.length).toEqual(0);
    expect(createPolygonComponent.mock.calls.length).toEqual(0);
  });
  it('Parse Point', () => {
    geojsonParse({geometry: {type: 'Point'}});
    expect(createPointComponent.mock.calls.length).toEqual(1);
    expect(createPointComponent.mock.calls[0][0]).toEqual({geometry: {type: 'Point'}});
    expect(createLineStringComponent.mock.calls.length).toEqual(0);
    expect(createPolygonComponent.mock.calls.length).toEqual(0);
  });
  it('Parse Polygon', () => {
    geojsonParse({geometry: {type: 'Polygon'}});
    expect(createPolygonComponent.mock.calls.length).toEqual(1);
    expect(createPolygonComponent.mock.calls[0][0]).toEqual({geometry: {type: 'Polygon'}});
    expect(createLineStringComponent.mock.calls.length).toEqual(0);
    expect(createPointComponent.mock.calls.length).toEqual(0);
  });
  it('No type', () => {
    expect(geojsonParse({geometry: {}})).toEqual(null);
    expect(createLineStringComponent.mock.calls.length).toEqual(0);
    expect(createPointComponent.mock.calls.length).toEqual(0);
    expect(createPolygonComponent.mock.calls.length).toEqual(0);
  });
  it('Invalid type', () => {
    expect(geojsonParse({geometry: {type: 233}})).toEqual(null);
    expect(createLineStringComponent.mock.calls.length).toEqual(0);
    expect(createPointComponent.mock.calls.length).toEqual(0);
    expect(createPolygonComponent.mock.calls.length).toEqual(0);
  });
});