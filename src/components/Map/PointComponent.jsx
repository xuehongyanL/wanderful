import React from 'react';
import _ from 'lodash';
import {CircleMarker, Popup} from 'react-leaflet';

import {featureConfig} from '../../config';
import PopupCard from './PopupCard';
import randomKey from '../../utils/randomKey';

function createPointComponent(feature){
  let closeRef = React.createRef();
  let props = feature.properties;
  return (
    <CircleMarker
      key={randomKey()}
      center={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}
      {
      ...
      _.zipObject(featureConfig.validKeys['Point'], _.map(featureConfig.validKeys['Point'], (key) => {
        return _.isNil(props[key]) ? featureConfig.default[key] : props[key];
      }))
      }
    >
      <Popup closeButton={false} ref={closeRef}>
        <PopupCard
          feature={feature}
          validKeys={featureConfig.validKeys['Point']}
          closeRef={closeRef}
        />
      </Popup>
    </CircleMarker>
  );
}

export default createPointComponent;