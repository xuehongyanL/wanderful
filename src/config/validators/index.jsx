import colorValidator from './colorValidator';
import opacityValidator from './opacityValidator';
import positiveValidator from './positiveValidator';

function validator(value, key){
  switch(key){
  case 'color':
  case 'fillColor':
    return colorValidator(value);
  case 'opacity':
  case 'fillOpacity':
    return opacityValidator(value);
  case 'weight':
  case 'radius':
    return positiveValidator(value);
  default:
    return false;
  }
}

export default validator;