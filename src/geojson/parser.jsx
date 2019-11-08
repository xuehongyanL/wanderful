import React from 'react';
import _ from 'lodash';
import {Polyline, CircleMarker, Polygon} from 'react-leaflet';

function geojsonParse(feature, idx){
  if(!feature) return null;
  let randomKey = _.random(0, 10000000);
  switch(feature.geometry.type){
  case 'LineString':
    return (
      <Polyline
        key={randomKey}
        positions={feature.geometry.coordinates.map((plot)=>[plot[1], plot[0]])}
      />
    );
  case 'Point':
    return (
      <CircleMarker
        key={randomKey}
        center={[feature.geometry.coordinates].map((plot)=>[plot[1], plot[0]])[0]}
      />
    );
  case 'Polygon':
    return (
      <Polygon
        key={randomKey}
        positions={_.initial(feature.geometry.coordinates[0]).map((plot)=>[plot[1], plot[0]])}
      />
    );
  default:
    return null;
  }
}

export default geojsonParse;