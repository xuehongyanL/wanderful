import geojsonhint from '@mapbox/geojsonhint';
import _ from 'lodash';

import emitter from '../ev';
import _JSON from '../utils/json';
import {Point, LineString, Polygon, FeatureCollection} from '../features';

function geojsonTransform(jsonStr){
  let jsonObject;
  try {
    jsonObject = JSON.parse(jsonStr);
  }
  catch(e) {
    return jsonStr;
  }
  if(jsonObject.type !== 'FeatureCollection'){
    jsonObject = FeatureCollection([jsonObject]);
  }
  for(let i = 0; i < jsonObject.features.length; i++){
    let feature = jsonObject.features[i];
    if(feature.type === 'GeometryCollection'){
      feature.geometries.forEach((geometry) => {
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
      feature.geometry.coordinates.forEach((coordinate) => {
        jsonObject.features.push(Point({lat: coordinate[1], lng: coordinate[0]}));
      });
      jsonObject.features.splice(i, 1);
      i--;
    }
    else if(feature.geometry.type === 'MultiLineString'){
      feature.geometry.coordinates.forEach((coordinate) => {
        jsonObject.features.push(LineString(coordinate.map((coord) => ({
          lat: coord[1],
          lng: coord[0]
        }))));
      });
      jsonObject.features.splice(i, 1);
      i--;
    }
    else if(feature.geometry.type === 'MultiPolygon'){
      feature.geometry.coordinates.forEach((coordinate) => {
        jsonObject.features.push(Polygon([_.initial(coordinate[0]).map((coord) => ({
          lat: coord[1],
          lng: coord[0]
        }))]));
      });
      jsonObject.features.splice(i, 1);
      i--;
    }
  }
  return _JSON.stringify(jsonObject);
}

export default geojsonTransform;