import _ from 'lodash';

import _featureEqual from './featureCompare';
import {pointFeature1 as feature} from '../../__test__/data/features/Point';

describe('Feature equality', () => {
  let feature1 = _.cloneDeep(feature);
  let feature2 = _.cloneDeep(feature);
  let feature3 = _.cloneDeep(feature);
  feature1.properties.colour = '#654321';
  feature2.properties.colour = '#233333';
  feature3.properties.colour = '#654321';
  feature3.geometry.coordinates[0] = -0.08843908861233333;
  it('Same', () => {
    expect(_featureEqual(feature1, feature1)).toEqual(true);
    expect(_featureEqual(feature2, feature2)).toEqual(true);
    expect(_featureEqual(feature3, feature3)).toEqual(true);
    expect(_featureEqual(feature1, feature2)).toEqual(true);
  });
  it('Different', () => {
    expect(_featureEqual(feature1, feature3)).toEqual(false);
    expect(_featureEqual(feature2, feature3)).toEqual(false);
  });
});