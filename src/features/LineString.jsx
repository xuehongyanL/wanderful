function LineString(latlngs){
  return {
    'type': 'Feature',
    'properties': {},
    'geometry': {
      'type': 'LineString',
      'coordinates': latlngs.map((latlng) => [latlng.lng, latlng.lat])
    }
  };
}

export default LineString;