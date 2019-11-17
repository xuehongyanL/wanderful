import _ from 'lodash';

import {featureConfig} from '../../config';

function Point(latlng, properties){
  return {
    'type': 'Feature',
    'properties': _.pick(properties, featureConfig.validKeys['Point']),
    'geometry': {
      'type': 'Point',
      'coordinates': [latlng.lng, latlng.lat]
    }
  };
}

export default Point;