import React from 'react';
import _ from 'lodash';
import {Polyline, CircleMarker, Polygon, Popup} from 'react-leaflet';

import {featureConfig} from '../config';
import createLineStringComponent from '../components/LineStringComponent';
import createPointComponent from '../components/PointComponent';
import createPolygonComponent from '../components/PolygonComponent';

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