import _ from 'lodash';

function positiveValidator(value){
  if(!_.isNumber(value)) return false;
  return (value >= 0.0);
}

export default positiveValidator;