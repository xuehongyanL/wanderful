import _ from 'lodash';
import geojsonhint from '@mapbox/geojsonhint';
import rewinder from '@mapbox/geojson-rewind';

import emitter from './ev';
import _JSON from './utils/json';
import {Point, LineString, Polygon} from './geojson/features';
import {handleCreate, handleDelete, handleEdit} from './handlers';

class Controller {
  constructor(){
    let self = this;
    self.jsonObj = {'type': 'FeatureCollection', 'features': []};
    emitter.on('createObj', (e) => {
      handleCreate(self, e);
    });
    emitter.on('deleteObj', (e) => {
      handleDelete(self, e);
    });
    emitter.on('editObj', (e) => {
      handleEdit(self, e);
    });
  }
  updateJSON(newJSON){
    let jsonObj, err;
    [jsonObj, err] = _JSON.parse(newJSON);
    if(!err) this.jsonObj = jsonObj;
    else{
      console.log(err);
      return err;
    }

    let geojsonErr = geojsonhint.hint(this.jsonObj);
    if(geojsonErr.length === 0){
      emitter.emit('json', this.jsonObj);
      return null;
    }
    else{
      console.log(geojsonErr);
      _.forEach(geojsonErr, (err) => {
        // alert(err.level + ' ' + err.message);
      });
      return geojsonErr;
    }
  }
}

export default new Controller();