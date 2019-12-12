import coordtransform from 'coordtransform';

function bd09towgs84(lng, lat){
  return coordtransform.gcj02towgs84(...coordtransform.bd09togcj02(lng, lat));
}

export default bd09towgs84;