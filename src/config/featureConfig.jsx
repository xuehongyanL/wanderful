import validator from './validators';

const featureConfig = {
  default: {
    color: '#3388ff',
    weight: 3,
    opacity: 1.0,
    fillColor: '#3388ff',
    fillOpacity: 0.2,
    radius: 10,
  },
  type: {
    color: 'color',
    weight: 'number',
    opacity: 'number',
    fillColor: 'color',
    fillOpacity: 'number',
    radius: 'number',
  },
  validKeys: {
    'LineString': ['color', 'weight', 'opacity'],
    'Point': ['radius', 'color', 'weight', 'opacity', 'fillColor', 'fillOpacity'],
    'Polygon': ['color', 'weight', 'opacity', 'fillColor', 'fillOpacity'],
  },
  validator: validator
};

export default featureConfig;