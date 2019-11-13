import _ from 'lodash';

import {featureConfig} from '../config';

function Point(latlng, properties){
  // console.log(JSON.stringify(properties.fillColor), properties.fillColor, properties['fillColor'], _.pick(properties, ['fillColor']));
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