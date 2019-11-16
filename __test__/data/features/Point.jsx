const pointCoordinates = [-0.08356532689164366, 51.51300494732007];
const pointFeature1 = {
  'type': 'Feature',
  'properties': {},
  'geometry': {'type': 'Point', 'coordinates': pointCoordinates}
};
const pointFeature2 = {
  'type': 'Feature',
  'properties': {'color': '#123456', 'weight': 120, 'opacity': 0.233, 'radius': 20, 'fillColor': '#654321', 'fillOpacity': 0.05},
  'geometry': {'type': 'Point', 'coordinates': pointCoordinates}
};
const pointFeature3 = {
  'type': 'Feature',
  'properties': {'color': '#123456', 'weight': 0, 'opacity': 0, 'radius': 0, 'fillColor': '#654321', 'fillOpacity': 0},
  'geometry': {'type': 'Point', 'coordinates': pointCoordinates}
};

export {pointFeature1, pointFeature2, pointFeature3};
