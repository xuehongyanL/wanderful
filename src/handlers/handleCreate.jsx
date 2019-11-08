import emitter from '../ev';
import {LineString, Point, Polygon} from '../features';

function handleCreate(self, e){
  let newObj = self.jsonObj;
  switch(e.layerType){
  case 'circlemarker':
    newObj.features.push(Point(e.layer._latlng));
    break;
  case 'polyline':
    newObj.features.push(LineString(e.layer._latlngs));
    break;
  case 'polygon':
  case 'rectangle':
    newObj.features.push(Polygon(e.layer._latlngs));
  default:
    break;
  }
  emitter.emit('text', JSON.stringify(newObj, null, 2));
}

export default handleCreate;