import React from 'react';
import _ from 'lodash';
import {Polygon, Popup} from 'react-leaflet';

import {featureConfig} from '../config';
import PopupCard from './PopupCard';
import randomKey from '../utils/randomKey';

function createPolygonComponent(feature){
  let closeRef = React.createRef();
  return (
    <Polygon
      key={randomKey()}
      positions={_.map(_.initial(feature.geometry.coordinates[0]), (plot)=>[plot[1], plot[0]])}
      color={feature.properties.color || featureConfig.default.color}
      weight={feature.properties.weight || featureConfig.default.weight}
      opacity={feature.properties.opacity || featureConfig.default.opacity}
      fillColor={feature.properties.fillColor || featureConfig.default.fillColor}
      fillOpacity={feature.properties.fillOpacity || featureConfig.default.fillOpacity}
    >
      <Popup closeButton={false} ref={closeRef}>
        <PopupCard
          feature={feature}
          validKeys={featureConfig.validKeys['Polygon']}
          closeRef={closeRef}
        />
      </Popup>
    </Polygon>
  );
}

export default createPolygonComponent;