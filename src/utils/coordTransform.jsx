import _ from 'lodash';

function coordTransformSingleRecord(origin, fromMode, toMode, shift){
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
  }
  middleware = shift(middleware.lng, middleware.lat);
  middleware = {lat: middleware[1], lng: middleware[0]};
  switch(toMode){
  case 'latlngObj':
    return middleware;
  case 'lnglatArr':
    return [middleware.lng, middleware.lat];
  case 'latlngArr':
    return [middleware.lat, middleware.lng];
  }
}

function coordTransform(origin, fromMode, toMode, shift){
  if(_.isNil(shift)) shift = (lng, lat) => [lng, lat];
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
    return coordTransformSingleRecord(origin, fromMode, toMode, shift);
  }
  else{
    return _.map(origin, (rec) => (
      coordTransform(rec, fromMode, toMode, shift)
    ));
  }
}

export default coordTransform;