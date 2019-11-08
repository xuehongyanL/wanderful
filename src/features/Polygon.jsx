import rewinder from '@mapbox/geojson-rewind';

function Polygon(latlngs){
  latlngs[0].push(latlngs[0][0]);
  return rewinder({
    'type': 'Feature',
    'properties': {},
    'geometry': {
      'type': 'Polygon',
      'coordinates': [latlngs[0].map((latlng) => [latlng.lng, latlng.lat])]
    }
  });
}

export default Polygon;