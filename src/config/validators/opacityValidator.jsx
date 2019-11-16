import _ from 'lodash';

function opacityValidator(value){
  if(!_.isNumber(value)) return false;
  return (value >= 0.0 && value <= 1.0);
}

export default opacityValidator;