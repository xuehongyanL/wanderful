import {noShift, wgs84togcj02, gcj02towgs84, wgs84tobd09, bd09towgs84} from './shifts';
import {searchOSM, searchGaode, searchBaidu} from './interfaces';

const poiConfig = {
  pageLimit: 10,
  sources: {
    'poi-OSM': {
      shift: noShift,
      unshift: noShift,
      search: searchOSM
    },
    'poi-Baidu': {
      shift: wgs84tobd09,
      unshift: bd09towgs84,
      search: searchBaidu
    },
    'poi-Gaode': {
      shift: wgs84togcj02,
      unshift: gcj02towgs84,
      search: searchGaode
    }
  }
};

export default poiConfig;