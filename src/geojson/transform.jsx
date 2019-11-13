import geojsonhint from '@mapbox/geojsonhint';
import _ from 'lodash';

import emitter from '../ev';
import _JSON from '../utils/json';
import {Point, LineString, Polygon, FeatureCollection} from './features';
import {featureConfig} from '../config';

function geojsonTransform(jsonStr){
  let jsonObject, err;
  [jsonObject, err] = _JSON.parse(jsonStr);
  if(err){
    console.log(err);
    return jsonStr;
  }

  if(jsonObject.type !== 'FeatureCollection'){
    jsonObject = FeatureCollection([jsonObject]);
  }
  for(let i = 0; i < jsonObject.features.length; i++){
    let feature = jsonObject.features[i];
    if(feature.type === 'GeometryCollection'){
      _.forEach(feature.geometries, (geometry) => {
        jsonObject.features.push({
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': geometry.type,
            'coordinates': geometry.coordinates
          }
        });
      });
      jsonObject.features.splice(i, 1);
      i--;
    }
    else if(feature.geometry.type === 'MultiPoint'){
      _.forEach(feature.geometry.coordinates, (coordinate) => {
        jsonObject.features.push(Point({lat: coordinate[1], lng: coordinate[0]}, feature.properties));
      });
      jsonObject.features.splice(i, 1);
      i--;
    }
    else if(feature.geometry.type === 'MultiLineString'){
      _.forEach(feature.geometry.coordinates, (coordinate) => {
        jsonObject.features.push(LineString(_.map(coordinate, (coord) => ({
          lat: coord[1],
          lng: coord[0]
        })), feature.properties));
      });
      jsonObject.features.splice(i, 1);
      i--;
    }
    else if(feature.geometry.type === 'MultiPolygon'){
      _.forEach(feature.geometry.coordinates, (coordinate) => {
        jsonObject.features.push(Polygon([_.map(_.initial(coordinate[0]), (coord) => ({
          lat: coord[1],
          lng: coord[0]
        }))], feature.properties));
      });
      jsonObject.features.splice(i, 1);
      i--;
    }
  }

  for(let i = 0; i < jsonObject.features.length; i++){
    let feature = jsonObject.features[i];
    jsonObject.features[i].properties = _.pick(feature.properties, _.filter(
      _.keys(feature.properties),
      (elem) => (
        _.includes(featureConfig.validKeys[feature.geometry.type], elem)
      )
    ));
  }
  return _JSON.stringify(jsonObject);
}

export default geojsonTransform;