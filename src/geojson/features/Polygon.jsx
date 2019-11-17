import _ from 'lodash';
import rewinder from '@mapbox/geojson-rewind';

import {featureConfig} from '../../config';

function Polygon(latlngs, properties){
  let _latlngs = _.cloneDeep(latlngs);
  _latlngs[0].push(_latlngs[0][0]);
  return rewinder({
    'type': 'Feature',
    'properties': _.pick(properties, featureConfig.validKeys['Polygon']),
    'geometry': {
      'type': 'Polygon',
      'coordinates': [_.map(_latlngs[0], (latlng) => [latlng.lng, latlng.lat])]
    }
  });
}

export default Polygon;