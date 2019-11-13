import _ from 'lodash';

function coordTransformSingleRecord(origin, fromMode, toMode){
  let middleware;
  switch(fromMode){
  case 'latlngObj':
    middleware = origin;
    break;
  case 'lnglatArr':
    middleware = {lat: origin[1], lng: origin[0]};
    break;
  case 'latlngArr':
    middleware = {lat: origin[0], lng: origin[1]};
    break;
  default:
    return origin;
  }
  switch(toMode){
  case 'latlngObj':
    return middleware;
  case 'lnglatArr':
    return [middleware.lng, middleware.lat];
  case 'latlngArr':
    return [middleware.lat, middleware.lng];
  default:
    return origin;
  }
}

function coordTransform(origin, fromMode, toMode){
  let isRecord = false;
  switch(fromMode){
  case 'latlngObj':
    if(_.has(origin, 'lat') && _.has(origin, 'lng')){
      isRecord = true;
    }
    else{
      isRecord = false;
    }
    break;
  case 'latlngArr':
  case 'lnglatArr':
    if(_.isArray(origin) && origin.length === 2 && _.isNumber(origin[0]) && _.isNumber(origin[1])){
      isRecord = true;
    }
    else{
      isRecord = false;
    }
  }
  if(isRecord){
    return coordTransformSingleRecord(origin, fromMode, toMode);
  }
  else{
    return _.map(origin, (rec) => (
      coordTransform(rec, fromMode, toMode)
    ));
  }
}

export {coordTransform};