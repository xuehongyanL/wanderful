import {pointFeature2} from './Point';
import {lineStringFeature2} from './LineString';
import {polygonFeature1} from './Polygon';

const featureGroupObj = {
  'type': 'FeatureCollection',
  'features': [pointFeature2, lineStringFeature2, polygonFeature1]
};

export {featureGroupObj};