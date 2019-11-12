import _ from 'lodash';
import rewinder from '@mapbox/geojson-rewind';

import {featureConfig} from '../config';

function Polygon(latlngs, properties){
  latlngs[0].push(latlngs[0][0]);
  return rewinder({
    'type': 'Feature',
    'properties': _.pick(properties, featureConfig.validKeys['Polygon']),
    'geometry': {
      'type': 'Polygon',
      'coordinates': [latlngs[0].map((latlng) => [latlng.lng, latlng.lat])]
    }
  });
}

export default Polygon;