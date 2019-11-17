import React from 'react';
import _ from 'lodash';
import {Polyline, CircleMarker, Polygon, Popup} from 'react-leaflet';

import {featureConfig} from '../config';
import {
  createLineStringComponent,
  createPointComponent,
  createPolygonComponent
} from '../components';

function geojsonParse(feature){
  if(_.has(feature, 'geometry.type') === false) return null;
  switch(feature.geometry.type){
  case 'LineString':
    return createLineStringComponent(feature);
  case 'Point':
    return createPointComponent(feature);
  case 'Polygon':
    return createPolygonComponent(feature);
  default:
    return null;
  }
}

export default geojsonParse;