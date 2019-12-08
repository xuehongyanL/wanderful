import {noShift, wgs84togcj02, gcj02towgs84, wgs84tobd09, bd09towgs84} from './shifts';

const poiConfig = {
  'poi-OSM': {
    shift: noShift,
    unshift: noShift
  },
  'poi-Baidu': {
    shift: wgs84tobd09,
    unshift: bd09towgs84
  },
  'poi-Gaode': {
    shift: wgs84togcj02,
    unshift: gcj02towgs84
  }
};

export default poiConfig;