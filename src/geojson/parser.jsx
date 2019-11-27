import React from 'react';
import _ from 'lodash';
import {Polyline, CircleMarker, Polygon, Popup} from 'react-leaflet';

import {featureConfig} from '../config';
import {
  createLineStringComponent,
  createPointComponent,
  createPolygonComponent
} from '../components/Map';

function geojsonParse(feature, shift){
  if(_.has(feature, 'geometry.type') === false) return null;
  switch(feature.geometry.type){
  case 'LineString':
    return createLineStringComponent(feature, shift);
  case 'Point':
    return createPointComponent(feature, shift);
  case 'Polygon':
    return createPolygonComponent(feature, shift);
  default:
    return null;
  }
}

export default geojsonParse;