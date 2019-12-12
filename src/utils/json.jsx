import {jsonConfig} from '../config';

class _JSON {
  parse(text){
    let jsonObj;
    try {
      jsonObj = JSON.parse(text);
      return [jsonObj, null];
    }
    catch(e){
      return [null, e];
    }
  }
  stringify(value){
    return JSON.stringify(value, jsonConfig.replacer, jsonConfig.space);
  }
}

export default new _JSON();