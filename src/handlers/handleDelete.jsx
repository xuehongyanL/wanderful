import _ from 'lodash';

import emitter from '../ev';
import {LineString, Point, Polygon} from '../features';

function handleDelete(self, e){
  let newObj = _.cloneDeep(self.jsonObj);
  _.forEach(e.layers._layers, (layer) => {
    let toDeleteObj;
    if(_.has(layer, '_latlng')){
      toDeleteObj = Point(layer._latlng);
    }
    else if(_.has(layer, '_latlngs')){
      if(layer._latlngs.length === 1){
        toDeleteObj = Polygon(layer._latlngs);
      }
      else{
        toDeleteObj = LineString(layer._latlngs);
      }
    }
    newObj = _.cloneDeep(deleteObj(newObj, toDeleteObj));
  });
  emitter.emit('text', JSON.stringify(newObj, null, 2));
}

function deleteObj(oldObj, toDeleteObj){
  let newObj = oldObj.features;
  let deleteIdx = _.findIndex(newObj, (obj) => _.isEqual(obj, toDeleteObj));
  if(deleteIdx !== -1) newObj.splice(deleteIdx, 1);
  oldObj.features = newObj;
  return oldObj;
}

export default handleDelete;