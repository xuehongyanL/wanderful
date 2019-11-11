import _ from 'lodash';

import emitter from '../ev';
import _JSON from '../utils/json';
import {LineString, Point, Polygon} from '../features';
import {coordTransform} from '../utils/coordTransform';

function handleEdit(self, e){
  let newObj = _.cloneDeep(self.jsonObj);
  _.forEach(e.layers._layers, (layer) => {
    let toEditObj, toReplaceObj;
    if(_.has(layer, '_latlng')){
      toEditObj = Point(coordTransform(layer.options.center, 'latlngArr', 'latlngObj'));
      toReplaceObj = Point(layer._latlng);
    }
    else if(_.has(layer, '_latlngs')){
      if(layer._latlngs.length === 1){
        toEditObj = Polygon([coordTransform(layer.options.positions, 'latlngArr', 'latlngObj')]);
        toReplaceObj = Polygon(layer._latlngs);
      }
      else{
        toEditObj = LineString(coordTransform(layer.options.positions, 'latlngArr', 'latlngObj'));
        toReplaceObj = LineString(layer._latlngs);
      }
    }
    newObj = _.cloneDeep(editObj(newObj, toEditObj, toReplaceObj));
  });
  emitter.emit('text', _JSON.stringify(newObj));
}

function editObj(oldObj, toEditObj, toReplaceObj){
  let newObj = oldObj.features;
  let editIdx = _.findIndex(newObj, (obj) => _.isEqual(obj, toEditObj));
  if(editIdx !== -1) newObj[editIdx] = toReplaceObj;
  oldObj.features = newObj;
  return oldObj;
}

export default handleEdit;