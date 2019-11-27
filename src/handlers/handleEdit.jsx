import _ from 'lodash';

import emitter from '../ev';
import _JSON from '../utils/json';
import {LineString, Point, Polygon} from '../geojson/features';
import coordTransform from '../utils/coordTransform';
import _featureEqual from '../utils/featureCompare';

function handleEdit(self, e, shift, unshift){
  let newObj = _.cloneDeep(self.jsonObj);
  _.forEach(e.layers._layers, (layer) => {
    let toEditObj, toReplaceObj;
    if(_.has(layer, '_latlng')){
      toEditObj = Point(coordTransform(layer.options.center, 'latlngArr', 'latlngObj'), layer.options);
      toReplaceObj = Point(layer._latlng, layer.options);
    }
    else if(_.has(layer, '_latlngs')){
      if(layer._latlngs.length === 1){
        toEditObj = Polygon([coordTransform(layer.options.positions, 'latlngArr', 'latlngObj')], layer.options);
        toReplaceObj = Polygon(layer._latlngs, layer.options);
      }
      else{
        toEditObj = LineString(coordTransform(layer.options.positions, 'latlngArr', 'latlngObj'), layer.options);
        toReplaceObj = LineString(layer._latlngs, layer.options);
      }
    }
    newObj = _.cloneDeep(editObj(newObj, toEditObj, toReplaceObj, layer.options.properties, shift, unshift));
  });
  emitter.emit('text', _JSON.stringify(newObj));
}

function editObj(oldObj, toEditObj, toReplaceObj, properties, shift, unshift){
  let newObj = oldObj.features;
  let editIdx = _.findIndex(newObj, (obj) => _featureEqual(obj, toEditObj, shift));
  if(editIdx !== -1){
    newObj[editIdx].geometry = toReplaceObj.geometry;
    newObj[editIdx].geometry.coordinates = coordTransform(toReplaceObj.geometry.coordinates, 'lnglatArr', 'lnglatArr', unshift);
    if(!_.isNil(properties)) newObj[editIdx].properties = properties;
  }
  oldObj.features = newObj;
  return oldObj;
}

export default handleEdit;