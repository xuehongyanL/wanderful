import coordtransform from 'coordtransform';

function wgs84tobd09(lng, lat){
  return coordtransform.gcj02tobd09(...coordtransform.wgs84togcj02(lng, lat));
}

export default wgs84tobd09;