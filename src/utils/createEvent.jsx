import _ from 'lodash';

import coordTransform from './coordTransform';

function createEvent(feature){
  let coordinates;
  switch(feature.geometry.type){
  case 'LineString':
    coordinates = _.map(feature.geometry.coordinates, (plot) => [plot[1], plot[0]]);
    return {layers: {_layers: {0: {
      options: {positions: coordinates, properties: feature.properties},
      _latlngs: coordTransform(coordinates, 'latlngArr', 'latlngObj')
    }}}};
  case 'Point':
    coordinates = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
    return {layers: {_layers: {0: {
      options: {center: coordinates, properties: feature.properties},
      _latlng: coordTransform(coordinates, 'latlngArr', 'latlngObj')
    }}}};
  case 'Polygon':
    coordinates = _.map(_.initial(feature.geometry.coordinates[0]), (plot) => [plot[1], plot[0]]);
    return {layers: {_layers: {0: {
      options: {positions: coordinates, properties: feature.properties},
      _latlngs: coordTransform([coordinates], 'latlngArr', 'latlngObj')
    }}}};
  }
}

export default createEvent;