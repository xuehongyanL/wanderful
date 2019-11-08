import geojsonhint from '@mapbox/geojsonhint';
import rewinder from '@mapbox/geojson-rewind';

import emitter from './ev';
import {Point, LineString, Polygon} from './features';
import {handleCreate, handleDelete} from './handlers';

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
  }
  updateJSON(newJSON){
    try {
      this.jsonObj = JSON.parse(newJSON);
    }
    catch(e) {
      console.log(e);
      return;
    }

    let geojsonErr = geojsonhint.hint(this.jsonObj);
    if(geojsonErr.length === 0){
      emitter.emit('json', this.jsonObj);
    }
    else{
      console.log(geojsonErr);
      geojsonErr.forEach((err) => {
        // alert(err.level + ' ' + err.message);
      });
    }
  }
}

export default Controller;