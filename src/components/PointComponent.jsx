import React from 'react';
import _ from 'lodash';
import {CircleMarker, Popup} from 'react-leaflet';

import {featureConfig} from '../config';
import PopupCard from './PopupCard';
import randomKey from '../utils/randomKey';

function createPointComponent(feature){
  let closeRef = React.createRef();
  return (
    <CircleMarker
      key={randomKey()}
      center={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}
      radius={feature.properties.radius || featureConfig.default.radius}
      color={feature.properties.color || featureConfig.default.color}
      weight={feature.properties.weight || featureConfig.default.weight}
      opacity={feature.properties.opacity || featureConfig.default.opacity}
      fillColor={feature.properties.fillColor || featureConfig.default.fillColor}
      fillOpacity={feature.properties.fillOpacity || featureConfig.default.fillOpacity}
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