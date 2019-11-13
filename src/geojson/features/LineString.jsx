import _ from 'lodash';

import {featureConfig} from '../../config';

function LineString(latlngs, properties){
  return {
    'type': 'Feature',
    'properties': _.pick(properties, featureConfig.validKeys['LineString']),
    'geometry': {
      'type': 'LineString',
      'coordinates': _.map(latlngs, (latlng) => [latlng.lng, latlng.lat])
    }
  };
}

export default LineString;