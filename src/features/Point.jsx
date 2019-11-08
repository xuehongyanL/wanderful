function Point(latlng){
  return {
    'type': 'Feature',
    'properties': {},
    'geometry': {
      'type': 'Point',
      'coordinates': [latlng.lng, latlng.lat]
    }
  };
}

export default Point;