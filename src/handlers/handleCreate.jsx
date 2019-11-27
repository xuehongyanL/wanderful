import _ from 'lodash';

import emitter from '../ev';
import _JSON from '../utils/json';
import {LineString, Point, Polygon} from '../geojson/features';
import coordTransform from '../utils/coordTransform';

function handleCreate(self, e, unshift){
  let newObj = _.cloneDeep(self.jsonObj);
  switch(e.layerType){
  case 'circlemarker':
    newObj.features.push(Point(unshiftBeforeCreate(e.layer._latlng, unshift), {}));
    break;
  case 'polyline':
    newObj.features.push(LineString(unshiftBeforeCreate(e.layer._latlngs, unshift), {}));
    break;
  case 'polygon':
  case 'rectangle':
    newObj.features.push(Polygon(unshiftBeforeCreate(e.layer._latlngs, unshift), {}));
  default:
    break;
  }
  emitter.emit('text', _JSON.stringify(newObj));
}

function unshiftBeforeCreate(obj, unshift){
  return coordTransform(obj, 'latlngObj', 'latlngObj', unshift);
}

export default handleCreate;