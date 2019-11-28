const polygonCoordinates1 = [[[-0.1, 51.5], [0, 51.5], [116.39123275, 39.90677249], [-0.1, 51.6], [-0.1, 51.5]]];
const polygonCoordinates2 = [[[-0.1, 51.5], [-0.1, 51.6], [116.39123275, 39.90677249], [0, 51.5], [-0.1, 51.5]]];
const polygonFeature1 = {
  'type': 'Feature',
  'properties': {},
  'geometry': {'type': 'Polygon', 'coordinates': polygonCoordinates1}};
const polygonFeature2 = {
  'type': 'Feature',
  'properties': {'color': '#123456', 'weight': 120, 'opacity': 0.233, 'fillColor': '#654321', 'fillOpacity': 0.05},
  'geometry': {'type': 'Polygon', 'coordinates': polygonCoordinates1}
};
const polygonFeature3 = {
  'type': 'Feature',
  'properties': {'color': '#123456', 'weight': 0, 'opacity': 0, 'fillColor': '#654321', 'fillOpacity': 0},
  'geometry': {'type': 'Polygon', 'coordinates': polygonCoordinates1}
};
const polygonFeature4 = {
  'type': 'Feature',
  'properties': {'color': '#123456', 'weight': 0, 'opacity': 0, 'fillColor': '#654321', 'fillOpacity': 0},
  'geometry': {'type': 'Polygon', 'coordinates': polygonCoordinates2}
};

export {polygonFeature1, polygonFeature2, polygonFeature3, polygonFeature4};
