import _ from 'lodash';

function randomKey(){
  return _.random(0, 10000000);
}

export default randomKey;