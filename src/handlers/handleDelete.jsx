import _ from 'lodash';

import emitter from '../ev';
import _JSON from '../utils/json';
import {LineString, Point, Polygon} from '../features';
import _featureEqual from '../utils/featureCompare';

function handleDelete(self, e){
  let newObj = _.cloneDeep(self.jsonObj);
  _.forEach(e.layers._layers, (layer) => {
    let toDeleteObj;
    if(_.has(layer, '_latlng')){
      toDeleteObj = Point(layer._latlng, layer.options);
    }
    else if(_.has(layer, '_latlngs')){
      if(layer._latlngs.length === 1){
        toDeleteObj = Polygon(layer._latlngs, layer.options);
      }
      else{
        toDeleteObj = LineString(layer._latlngs, layer.options);
      }
    }
    newObj = _.cloneDeep(deleteObj(newObj, toDeleteObj));
  });
  emitter.emit('text', _JSON.stringify(newObj));
}

function deleteObj(oldObj, toDeleteObj){
  let newObj = oldObj.features;
  let deleteIdx = _.findIndex(newObj, (obj) => _featureEqual(obj, toDeleteObj));
  if(deleteIdx !== -1) newObj.splice(deleteIdx, 1);
  oldObj.features = newObj;
  return oldObj;
}

export default handleDelete;