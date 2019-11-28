const lineStringCoordinates = [
  [-0.08867390513199515, 51.51921322437121],
  [-0.07344375666854974, 51.50630993620114],
  [116.39123275, 39.90677249],
  [-0.06120970040855768, 51.50615445438362],
  [-0.08717585379189874, 51.51120740059332]
];
const lineStringFeature1 = {
  'type': 'Feature',
  'properties': {},
  'geometry': {'type': 'LineString', 'coordinates': lineStringCoordinates}
};
const lineStringFeature2 = {
  'type': 'Feature',
  'properties': {'color': '#123456', 'weight': 120, 'opacity': 0.233},
  'geometry': {'type': 'LineString', 'coordinates': lineStringCoordinates}
};
const lineStringFeature3 = {
  'type': 'Feature',
  'properties': {'color': '#123456', 'weight': 0, 'opacity': 0},
  'geometry': {'type': 'LineString', 'coordinates': lineStringCoordinates}
};

export {lineStringFeature1, lineStringFeature2, lineStringFeature3};