import _ from 'lodash';

import {featureConfig} from '../config';

function _featureEqual(feature1, feature2){
  if(_.isEqual(feature1.geometry, feature2.geometry) === false) return false;
  let ret = true;
  // _.forEach(featureConfig.validKeys[feature1.geometry.type], (key) => {
  //   let val1 = (_.isNil(feature1.properties[key])) ? featureConfig.default[key] : feature1.properties[key];
  //   let val2 = (_.isNil(feature2.properties[key])) ? featureConfig.default[key] : feature2.properties[key];
  //   if(_.isEqual(val1, val2) === false){
  //     console.log(key, val1, val2);
  //     ret = false;
  //     return false;
  //   }
  // });
  return ret;
}

export default  _featureEqual;