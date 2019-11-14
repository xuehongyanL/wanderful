import _ from 'lodash';

import {featureConfig} from '../../config';

function Point(latlng, properties){
  return {
    'type': 'Feature',
    'properties': _.pick(properties, _.filter(
      _.keys(properties),
      (elem) => (
        _.includes(featureConfig.validKeys['Point'], elem)
      )
    )),
    'geometry': {
      'type': 'Point',
      'coordinates': [latlng.lng, latlng.lat]
    }
  };
}

export default Point;